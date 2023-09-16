from flask_wtf import FlaskForm
from wtforms import DecimalField
from wtforms.validators import DataRequired


class TransferForm(FlaskForm):
    cash = DecimalField('Cash', validators=[DataRequired()])
    # transfer = SubmitField('Transfer')
