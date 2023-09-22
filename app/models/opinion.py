from .db import db
from .db import add_prefix_for_prod


class Opinion(db.Model):
    __tablename__ = 'opinions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)
    content = db.Column(db.Text, nullable=False)

    stock = db.relationship("Stock", back_populates='opinions')
    user = db.relationship("User", back_populates='opinions')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'content': self.content
        }


