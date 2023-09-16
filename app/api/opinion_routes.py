from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Opinion

opinion_routes = Blueprint('opinions', __name__)

