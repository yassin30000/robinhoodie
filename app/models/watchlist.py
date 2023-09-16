from .db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # define relationship with users table
    user = relationship('User', back_populates='watchlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id
        }
