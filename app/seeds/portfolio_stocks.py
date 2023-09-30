from app.models import db, Portfolio_Stock, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_portfolio_stocks():

    for x in range(1, 14):
        stock = Portfolio_Stock(
            shares=x, portfolio_id=1, stock_id=x, price=94
        )

        stock1 = Portfolio_Stock(
            shares=x+1.4, portfolio_id=2, stock_id=x+1, price=125
        )
        stock2 = Portfolio_Stock(
            shares=x+1.2, portfolio_id=3, stock_id=x+2, price=233
        )
        db.session.add(stock)
        db.session.add(stock1)
        db.session.add(stock2)




    stock2 = Portfolio_Stock(
        shares=-2, portfolio_id=2, stock_id=2, price=100)
    stock3 = Portfolio_Stock(
        shares=-2, portfolio_id=1, stock_id=4, price=150)
    stock4 = Portfolio_Stock(
        shares=-5, portfolio_id=3, stock_id=10, price=100)
    stock5 = Portfolio_Stock(
        shares=-3, portfolio_id=1, stock_id=7, price=200)
    stock6 = Portfolio_Stock(
        shares=-5, portfolio_id=3, stock_id=7, price=200)


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
def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
