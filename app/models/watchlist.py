from .db import db, add_prefix_for_prod
from sqlalchemy.orm import relationship
from flask import jsonify


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # define relationship with users table
    user = relationship('User', back_populates='watchlists')
    watchlist_stocks = relationship('Watchlist_Stock', back_populates='watchlist', cascade='all, delete-orphan')

    def to_dict(self):
        watchlist_stocks_data = []
        for watchlist_stock in self.watchlist_stocks:
            watchlist_stocks_data.append(watchlist_stock.to_dict())

        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'stocks': watchlist_stocks_data
        }
