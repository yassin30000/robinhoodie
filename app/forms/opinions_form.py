from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Opinion


def opinion_length(form, field):
    content = field.data

    if len(content) < 10:
        raise ValidationError("Your opinion must be more than 10 characters")
    
    if len(content) > 5000:
        raise ValidationError("Your opinion cannot be more than 5000 characters")


class OpinionForm(FlaskForm):
    content = TextAreaField('Opinion', validators=[DataRequired(), opinion_length])
