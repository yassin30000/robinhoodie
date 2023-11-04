from app.models import db, Watchlist_Stock, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_watchlist_stocks():

    stock1 = Watchlist_Stock(
       watchlist_id=1, stock_id=1)
    stock2 = Watchlist_Stock(
       watchlist_id=1, stock_id=2)
    stock3 = Watchlist_Stock(
       watchlist_id=1, stock_id=3)
    stock4 = Watchlist_Stock(
       watchlist_id=2, stock_id=4)
    stock5 = Watchlist_Stock(
       watchlist_id=2, stock_id=14)
    stock6 = Watchlist_Stock(
       watchlist_id=3, stock_id=16)
    stock7 = Watchlist_Stock(
       watchlist_id=3, stock_id=3)



    db.session.add(stock1)
    db.session.add(stock2)
    db.session.add(stock3)
    db.session.add(stock4)
    db.session.add(stock5)
    db.session.add(stock6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
