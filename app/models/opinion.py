from .db import db


class Opinion(db.Model):
    __tablename__ = 'opinions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    stock_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)

    stocks = db.relationship("Stock", back_populates='opinions')


