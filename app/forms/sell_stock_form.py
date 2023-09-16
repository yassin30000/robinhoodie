from flask_wtf import FlaskForm
from wtforms import DecimalField, SubmitField
from wtforms.validators import DataRequired


class SellForm(FlaskForm):
    shares = DecimalField('Shares', validators=[DataRequired()])
    sell = SubmitField('Sell')
