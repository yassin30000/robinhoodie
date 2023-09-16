from .db import db
from sqlalchemy.orm import relationship


class Portfolio(db.Model):
    __tablename__ = 'portfolio'

    id = db.Column(db.Integer, primary_key=True)
    cash = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='portfolio')
    portfolio_stock = relationship('Portfolio_Stock', back_populates='portfolio')

    def to_dict(self):
        return {
            'id': self.id,
            'cash': self.cash,
            'user_id': self.user_id
        }
