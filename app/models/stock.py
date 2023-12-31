from .db import db, environment, SCHEMA, add_prefix_for_prod


class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    details = db.Column(db.Text, nullable=False)

    watchlist_stock = db.relationship("Watchlist_Stock", back_populates='stock', cascade="all, delete-orphan")
    portfolio_stocks = db.relationship("Portfolio_Stock", back_populates='stock', cascade='all, delete-orphan')
    opinions = db.relationship('Opinion', back_populates='stock', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'details': self.details
        }
