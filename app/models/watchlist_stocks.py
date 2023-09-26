from .db import db, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Watchlist_Stock(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)
    
    watchlist = relationship('Watchlist', back_populates='watchlist_stocks')
    stock = relationship('Stock', back_populates='watchlist_stock')

    def to_dict(self):
        
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'stock_id': self.stock_id,
            'ticker': self.stock.ticker
        }
