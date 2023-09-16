from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist


def watchlist_exists(form, field):
    name = field.data
    watchlist = Watchlist.query.filter(Watchlist.name == name).first()
    if watchlist:
        raise ValidationError('Watchlist name already exists')


class WatchlistForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), watchlist_exists])
