from app.models import db, Opinion, environment, SCHEMA
from sqlalchemy.sql import text
import random



def seed_opinions():
    
    sample_opinions = [
        "I'm keeping an eye on this company's performance.",
        "Interesting to see how this stock will perform in the future.",
        "It's important to do thorough research before investing.",
        "Diversifying your portfolio is a wise strategy.",
        "I'm staying cautious with my investments.",
        "This company is on the up!"
    ]

    for x in range(1, 10):
        for user_id in range(1, 5):
            opinion = Opinion(
                user_id=user_id,
                stock_id=x,
                content=random.choice(sample_opinions)
            )
            db.session.add(opinion)
    


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_opinions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.opinions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM opinions"))
        
    db.session.commit()