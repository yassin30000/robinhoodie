from flask.cli import AppGroup
from .users import seed_users, undo_users
from .opinions import seed_opinions, undo_opinions
from .stocks import seed_stocks, undo_stocks
from .portfolio import seed_portfolios, undo_portfolios
from .portfolio_stocks import seed_portfolio_stocks, undo_portfolio_stocks
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_stocks import seed_watchlist_stocks, undo_watchlist_stocks


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # undo functions below
        undo_watchlist_stocks
        undo_watchlists()
        undo_portfolio_stocks()
        undo_portfolios()
        undo_opinions()
        undo_stocks()
        undo_users()
    seed_users()
    seed_stocks()
    seed_opinions()
    seed_portfolios()
    seed_portfolio_stocks()
    seed_watchlists()
    seed_watchlist_stocks()
    # Add other seed functions here


@seed_commands.command('undo')
def undo():
    undo_watchlist_stocks()
    undo_watchlists()
    undo_portfolio_stocks()
    undo_portfolios()
    undo_opinions()
    undo_stocks()
    undo_users()
    # Add other undo functions here
