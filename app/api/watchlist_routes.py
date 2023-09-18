from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.watchlist_form import WatchlistForm
from ..models.watchlist import Watchlist
from ..models.watchlist_stocks import Watchlist_Stock
from app.models import db
from .auth_routes import validation_errors_to_error_messages
from ..models.stock import Stock
watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/new', methods=['POST'])
@login_required
def create_watchlist():
    """
    Creates a new watchlist
    """
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watchlist = Watchlist(
            name=form.data['name'],
            user_id=current_user.id
        )
        db.session.add(watchlist)
        db.session.commit()
        return watchlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@watchlist_routes.route('/')
@login_required
def get_watchlists():
    """
    Read all watchlists for current user
    """
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    return {'watchlists': {list.id: list.to_dict() for list in watchlists}}, 200


@watchlist_routes.route('/<int:watchlist_id>', methods=['PUT', 'PATCH'])
@login_required
def update_watchlist(watchlist_id):
    """
    Update a watchlist
    """
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    watchlist = Watchlist.query.get(watchlist_id)

    if watchlist.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 401

    if not watchlist:
        return {'message': 'Watchlist not found'}, 404

    if form.validate_on_submit():
        watchlist.name = form.data['name']

        db.session.commit()
        return watchlist.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id):
    """
    Delete a watchlist
    """
    watchlist = Watchlist.query.get(watchlist_id)

    if not watchlist:
        return {'message': 'Watchlist not found'}, 404

    if watchlist.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 401

    db.session.delete(watchlist)
    db.session.commit()
    return {'message': 'Successfuly deleted'}, 200


@watchlist_routes.route('/<int:watchlist_id>/<int:stock_id>', methods=['POST'])
@login_required
def add_to_watchlist(watchlist_id, stock_id):
    """
    make stock into watchlist_stock and adding to watchlist
    """

    watchlist = Watchlist.query.get(watchlist_id)
    stock = Stock.query.get(stock_id)

    if not watchlist:
        return {'message': 'Watchlist not found'}, 404

    if not stock:
        return {'message': 'Stock not found'}, 404

    if watchlist.user_id != current_user.id:
        return {'message': 'Unauthorized'}, 401

    existing_watchlist_stock = Watchlist_Stock.query.filter_by(
        watchlist_id=watchlist_id, stock_id=stock_id).first()

    if existing_watchlist_stock:
        return {'message': 'Stock already added to watchlist'}, 400

    new_watchlist_stock = Watchlist_Stock(
        watchlist_id=watchlist_id,
        stock_id=stock_id
    )

    if new_watchlist_stock:
        db.session.add(new_watchlist_stock)
        db.session.commit()
        return {'message': 'Successfully added stock to watchlist'}, 200


# @watchlist_routes.route('/<int:watchlist_id>')
# @login_required
# def get_watchlist_stocks(watchlist_id):
#     """
#     get all watchlist stocks in watchlist
#     """
#     watchlist_stocks = Watchlist_Stock.query.filter_by(
#         watchlist_id=watchlist_id).all()

#     watchlist_stocks_data = [
#         {"id": ws.id, "stock_id": ws.stock_id} for ws in watchlist_stocks]

#     return watchlist_stocks_data


@watchlist_routes.route('/<int:watchlist_id>/<int:stock_id>', methods=['DELETE'])
@login_required
def delete_watchlist_stock(watchlist_id, stock_id):
    """
    delete a watchlist_stock 
    """
    # Check if the watchlist exists
    watchlist = Watchlist.query.get(watchlist_id)
    if not watchlist:
        return {"message": "Watchlist not found"}, 404

    # Check if the watchlist_stock exists and is associated with the specified watchlist
    watchlist_stock = Watchlist_Stock.query.filter_by(
        watchlist_id=watchlist_id, stock_id=stock_id).first()

    if not watchlist_stock:
        return {"message": "Watchlist_stock not found"}, 404

    # Check if the current user has permission to delete the watchlist_stock
    if watchlist.user_id != current_user.id:
        return {"message": "Unauthorized"}, 401

    # Delete the watchlist_stock from the database
    db.session.delete(watchlist_stock)
    db.session.commit()

    return {"message": "Watchlist_stock deleted successfully"}, 200
