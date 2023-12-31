from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    cash = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = relationship('User', back_populates='portfolio')
    portfolio_stocks = relationship('Portfolio_Stock', back_populates='portfolio')

    def to_dict(self):
        portfolio_stocks_data = []
        for portfolio_stock in self.portfolio_stocks:
            portfolio_stocks_data.append(portfolio_stock.to_dict())
        return {
            'id': self.id,
            'cash': self.cash,
            'user_id': self.user_id,
            'portfolio_stocks': portfolio_stocks_data
        }


