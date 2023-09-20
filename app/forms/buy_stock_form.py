from flask_wtf import FlaskForm
from wtforms import DecimalField, SubmitField
from wtforms.validators import DataRequired


class BuyForm(FlaskForm):
    shares = DecimalField('Shares', validators=[DataRequired()])
    # buy = SubmitField('Buy')
