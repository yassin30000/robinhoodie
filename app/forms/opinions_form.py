from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Opinions



class Opinions(FlaskForm):
    content = TextField('Opinion', validators=[DataRequired()])
