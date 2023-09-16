from .db import db
from sqlalchemy.orm import relationship


class Portfolio_Stocks(db.Model):
    __tablename__ = 'portfolio_stocks'

    id = db.Column(db.Integer, primary_key=True)
    shares = db.Column(db.Float, nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolio.id'), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)

    portfolio = relationship('Portfolio', back_populates='portfolio_stocks')
    stock = relationship('Stock', back_populates='portfolio_stocks')

    def to_dict(self):
        return {
            'id': self.id,
            'shares': self.shares,
            'portfolio_id': self.portfolio_id,
            'stock_id': self.stock_id,
        }
