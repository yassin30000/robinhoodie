from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Opinion

opinion_routes = Blueprint('opinions', __name__)

@opinion_routes.route('/')
@login_required
def opinions():
    """
    Query for all opinions and returns them in a list of user dictionaries
    """
    opinions = Opinions.query.all()
    return {'opinions': [opinion.to_dict() for opinion in opinions]}