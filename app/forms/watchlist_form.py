from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist


def watchlist_exists(form, field):
    name = field.data
        
    existing_watchlist = Watchlist.query.filter_by(name=name, user_id=current_user.id).first()

    if existing_watchlist:
        raise ValidationError('Watchlist name already exists')


class WatchlistForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), watchlist_exists])
