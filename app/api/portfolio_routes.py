from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from ..forms.portfolio_transfer_fund_form import TransferForm
from ..forms.buy_stock_form import BuyForm
from ..forms.sell_stock_form import SellForm
from ..models import Portfolio, db, Portfolio_Stock, Stock
from .auth_routes import validation_errors_to_error_messages


portfolio_routes = Blueprint('portfolio', __name__)

# api_key = 'XCXDHAYPEBIVHJIN'
# url = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey={api_key}'
# r = request.get(url)
# data = r.json()


@portfolio_routes.route('/')
@login_required
def index():
    # current_portfolio = Portfolio.query.get(user_id)
    current_portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    print(current_portfolio)

    if current_portfolio:
        return current_portfolio.to_dict()
    elif not current_portfolio:
        return {"message": "User does not have a portfolio"}
    else:
        return {'error': 'error'}

# Get and Post funds
@portfolio_routes.route('/deposit-funds', methods=['POST', 'PUT'])
@login_required
def deposit_funds_post():
    '''
    Depositing funds into an account
    '''
    form = TransferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    portfolio_update = Portfolio.query.filter_by(user_id=current_user.id).first()

    if form.validate_on_submit():
        '''
        POST if there is no fund in account thus creating a funded account
        '''
        '''
        PUT if there is money then you update your account with additional funds
        '''
        if request.method == 'POST':
          if portfolio_update:
            return {"message": "User already has a portfolio"}

          new_funds = Portfolio(
              cash = form.data['cash'],
              user_id = current_user.id
          )
          db.session.add(new_funds)
          db.session.commit()
          return new_funds.to_dict()
        elif request.method == 'PUT':
            funds = form.data['cash']
            portfolio_update.cash = portfolio_update.cash + int(funds)
            db.session.commit()
            return portfolio_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# widthraw funds
@portfolio_routes.route('/withdraw-funds', methods=['PUT'])
@login_required
def withdraw_funds_post():
    form = TransferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    portfolio_update = Portfolio.query.filter_by(user_id=current_user.id).first()
    # current_cash = int(portfolio_update.cash)
    '''
    PUT if there is no fund give an error message else withdraw the money from the account
    '''
    if form.validate_on_submit():

        if portfolio_update.cash == 0:
            return {'message': "Error no funds to withdraw"}

        cash = form.data['cash']
        #checks to see if they have enough funds to withdraw money
        if portfolio_update.cash < cash:
            return {'message': "Error you don't have enough funds to withdraw"}, 401

        portfolio_update.cash = portfolio_update.cash - int(cash)
        db.session.commit()
        return portfolio_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# Buying a stock
@portfolio_routes.route('/buy-stocks/<int:stock_id>/<price>', methods=['POST'])
@login_required
def buy_stock_post(stock_id, price):
    form = BuyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    portfolio_update = Portfolio.query.filter_by(user_id=current_user.id).first()

    if not portfolio_update:
        return {"message": "You do not have any money in your portfolio"}
    elif current_user.id != portfolio_update.user_id:
        return {"message": "You do not own this portfolio"}

    total_cost = float(price) * float(form.data['shares'])

    if form.validate_on_submit():
        if request.method == 'POST':
            if total_cost > portfolio_update.cash:
                return {'message': 'Not enough funds to buy'}

            new_shares = Portfolio_Stock(
                shares = form.data['shares'],
                portfolio_id = portfolio_update.id,
                stock_id = stock_id,
                price = float(price)
            )
            db.session.add(new_shares)
            portfolio_update.cash = portfolio_update.cash - float(total_cost)
            db.session.commit()
            return portfolio_update.to_dict()


        # elif request.method == "PUT":
        #     #updates the current shares when buying a stock
        #     new_share = form.data['shares']
        #     stock_portfolio.shares = stock_portfolio.shares + float(new_share)
        #     #updates the cash amount after buyin shares
        #     portfolio_update.cash = portfolio_update.cash - float(total_cost)
        #     db.session.commit()
        #     return portfolio_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# Selling a stock
@portfolio_routes.route('/sell-stocks/<int:stock_id>/<price>', methods=['POST'])
@login_required
def sell_stock_post(stock_id, price):
    form = SellForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    portfolio_update = Portfolio.query.filter_by(user_id=current_user.id).first()
    if not portfolio_update:
        return {"message": "You do own this stock"}

    stock_portfolio = Portfolio_Stock.query.filter_by(stock_id=stock_id).all()

    portfolio_stocks_data = [stock.to_dict() for stock in stock_portfolio]

    total_number_of_shares = 0
    for stock in portfolio_stocks_data:
        total_number_of_shares += float(stock['shares'])


    #updates the current shares when selling a stock
    if form.validate_on_submit():
        sold_shares = float(form.data['shares'])

        #check to see if they have enough shares to sell
        if total_number_of_shares < sold_shares:
            return {'message': "Sorry you don't have enough shares to sell"}

        total_gain = float(price) * float((form.data['shares']))

        sold_shares = Portfolio_Stock(
                shares = -float(form.data['shares']),
                portfolio_id = portfolio_update.id,
                stock_id = stock_id,
                price = float(price)
            )

        #updates the cash amount after selling shares
        db.session.add(sold_shares)
        portfolio_update.cash = float(portfolio_update.cash) + float(total_gain)
        db.session.commit()
        return portfolio_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
