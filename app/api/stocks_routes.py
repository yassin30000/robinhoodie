from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock

stock_routes = Blueprint('stocks', __name__)


@stock_routes('/')
@login_required
def stocks():
    """
    Query for all stocks and returns them in alist of stock tickers 
    """
    stocks = Stock.query.all()
    return {'stocks': [stock.to_dict() for stock in stocks]}