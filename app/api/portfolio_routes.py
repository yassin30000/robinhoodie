from flask import Blueprint, redirect, request
from flask_login import login_required
from forms.portfolio_transfer_fund_form import TransferForm
from forms.buy_stock_form import BuyForm
from forms.sell_stock_form import SellForm
from ..models import portfolio, db, portfolio_stocks

portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/')
@login_required
def index():
    return 'portfolio'


# Get and Post funds
@portfolio_routes.route('/deposit-funds', methods=['GET', 'POST', 'PUT'])
@login_required
def deposit_funds_post():
    form = TransferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    portfolio_update = portfolio.query.get_or_404(id)
    if form.validate_on_submit():
        if request.method == 'POST':
            data = portfolio()
            form.populate_obj(data)
            db.session.add(data)
            db.commit()
            return redirect('/')
        elif request.method == 'PUT':
            cash = request.form['cash']
            portfolio_update.cash += int(cash)
            db.commit()
            return redirect('/')


# widthraw funds
@portfolio_routes.route('/withdraw-funds', methods=['GET', 'PUT'])
@login_required
def withdraw_funds_post():
    form = TransferForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    portfolio_update = portfolio.query.get_or_404(id)
    if form.validate_on_submit():
        if request.method == 'PUT':
            if portfolio_update.cash == 0:
                return "Error no funds to withdraw"
            cash = request.form['cash']
            portfolio_update.cash -= int(cash)
            db.commit()
            return redirect('/')


# Buying a stock
@portfolio_routes.route('/buy-stocks/<int:stock_id>', methods=['POST', 'PUT'])
@login_required
def buy_stock_post(stock_id):
    form = BuyForm()
    if form.validate_on_submit():
        if request.method == 'POST':
            data = portfolio_stocks()
            form.populate_obj(data)
            db.session.add(data)
            db.commit()
            return redirect('/')
        elif request.method == "PUT":
            pass


# Selling a stock
@portfolio_routes.route('/sell-stocks/<int:stock_id>', methods=['POST', 'PUT'])
@login_required
def sell_stock_post(stock_id):
    form = SellForm()
    if form.validate_on_submit():
        data = portfolio_stocks()
