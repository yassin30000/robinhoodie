from .db import db


class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    details = db.Column(db.Text, nullable=False)

    # watch_stocks = db.relationship("WatchStock", back_populates='stocks', cascade="all, delete-orphan")
    # portfrolio_stocks = db.relationship("PortfolioStock", back_populates='stocks', cascade='all, delete-orphan')
    opinions = db.relationship('Opinion', back_populates='stock', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'details': self.details
        }
