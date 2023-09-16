from flask import Blueprint
from flask_login import login_required
from forms.watchlist_form import WatchlistForm

watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/', methods=['POST'])
@login_required
def create_watchlist():
    """
    Creates a new watchlist
    """
    form = WatchlistForm()
    if form.validate_on_submit():
        #watchlist = Watchlist()
        pass

    