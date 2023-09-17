from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/')
@login_required
def get_stocks():
    """
    Query for all stocks and returns them in alist of stock tickers 
    """
    stocks = Stock.query.all()
    return {'stocks': {stock.ticker: stock.to_dict() for stock in stocks}}


@stock_routes.route('/<string:filter>')
@login_required
def get_filtered_stocks(filter):
    """
    Query for stocks based on name or ticker
    """
    search = f'%{filter}%'
    print(search)

    stocks_by_ticker = Stock.query.filter(Stock.ticker.like(search))
    stocks_by_name = Stock.query.filter(Stock.name.like(search.upper()))

    stocks = {stock.ticker: stock.to_dict() for stock in stocks_by_ticker}

    for stock in stocks_by_name:
        stocks[stock.ticker] = stock.to_dict()

    return {'stocks': stocks}
