from app.models import db, Opinion, environment, SCHEMA
from sqlalchemy.sql import text


def seed_opinions():

    for x in range(10):
        opinion1 = Opinion(
            user_id = 1, 
            stock_id= x, 
            content='Aliqua sunt aliqua culpa culpa occaecat exercitation et excepteur fugiat sunt sit duis consequat non. Ex do est cillum officia ad. Elit reprehenderit exercitation exercitation incididunt duis Lorem minim cillum. Deserunt mollit adipisicing ipsum nulla esse non incididunt laboris ullamco sint. Voluptate veniam excepteur id ex ut ea anim incididunt enim fugiat mollit sunt.')
        db.session.add(opinion1)

        opinion2 = Opinion(
            user_id = 2, 
            stock_id= x, 
            content='Reprehenderit cupidatat consequat adipisicing officia. Laboris ad do eu labore duis nisi. Excepteur minim ex eiusmod exercitation adipisicing commodo. Laborum consequat excepteur anim amet magna est commodo. Ex velit do pariatur aliquip minim occaecat et velit. Adipisicing anim ullamco et Lorem irure aliqua elit deserunt qui elit pariatur quis ut. Est aliquip magna et et anim officia elit cillum deserunt.')
        db.session.add(opinion2)

        opinion3 = Opinion(
            user_id = 3, 
            stock_id= x, 
            content='Occaecat ex tempor sint amet. Ut proident ipsum elit do sunt sunt eu in amet est minim consectetur ea culpa. Lorem ullamco ad eu velit excepteur exercitation eiusmod esse eu amet magna anim occaecat pariatur. Nulla dolore magna laborum commodo exercitation sit magna laboris veniam aliqua labore fugiat laboris culpa. In reprehenderit duis adipisicing laborum reprehenderit veniam. Amet officia pariatur laborum mollit officia.')
        db.session.add(opinion3)
    


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