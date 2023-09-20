from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_watchlists():
    list1 = Watchlist(
        name='Demo', user_id=1)
    list2 = Watchlist(
        name='marnie', user_id=1)
    list3 = Watchlist(
        name='bobbie', user_id=1)
    list4 = Watchlist(
        name='haru', user_id=1)

    list5 = Watchlist(
        name='Demo', user_id=2)
    list6 = Watchlist(
        name='marnie', user_id=2)
    list7 = Watchlist(
        name='bobbie', user_id=2)
    list8 = Watchlist(
        name='haru', user_id=2)

    list9 = Watchlist(
        name='Demo', user_id=3)
    list10 = Watchlist(
        name='marnie', user_id=3)
    list11 = Watchlist(
        name='bobbie', user_id=3)
    list12 = Watchlist(
        name='haru', user_id=3)

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.add(list7)
    db.session.add(list8)
    db.session.add(list9)
    db.session.add(list10)
    db.session.add(list11)
    db.session.add(list12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
