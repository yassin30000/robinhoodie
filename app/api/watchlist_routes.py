from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.watchlist_form import WatchlistForm
from ..models.watchlist import Watchlist
from app.models import db
from .auth_routes import validation_errors_to_error_messages
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
