from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Opinion
from ..forms.opinions_form import OpinionForm
from app.models import db
from .auth_routes import validation_errors_to_error_messages


opinion_routes = Blueprint('opinions', __name__)


@opinion_routes.route('/')
@login_required
def get_all_opinions():
    """
    Get all opinions
    """
    opinions = Opinion.query.all()
    return {'opinions': {opinion.id: opinion.to_dict() for opinion in opinions}}, 200


@opinion_routes.route('/stock/<int:stock_id>')
@login_required
def opinions_stock_id(stock_id):
    """
    Query for all opinions by stock_id
    """
    opinions = Opinion.query.filter_by(stock_id=stock_id).all()
    return {'opinions': [opinion.to_dict() for opinion in opinions]}


@opinion_routes.route('/user/<int:user_id>')
@login_required
def opinions_user_id(user_id):
    """
    Query for all opinions by user_id
    """
    opinions = Opinion.query.filter_by(user_id=user_id).all()
    return {'opinions': [opinion.to_dict() for opinion in opinions]}


@opinion_routes.route('/<int:stock_id>', methods=["POST"])
@login_required
def create_new_opinion(stock_id):
    """
    Post a new opinion by user_id, stock_id
    """
    form = OpinionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        opinion = Opinion(
            content=form.data['content'],
            user_id=current_user.id,
            stock_id=stock_id
        )
        db.session.add(opinion)
        db.session.commit()
        return opinion.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@opinion_routes.route('/<int:opinion_id>', methods=['DELETE'])
@login_required
def delete_opinion(opinion_id):
    """
    Delete an opinion by opinion id
    """
    opinion = Opinion.query.get(opinion_id)
    if opinion:
        db.session.delete(opinion)
        db.session.commit()
        return {'message': 'Successfuly deleted'}
    else:
        return {'message': 'Opinion not found'}


@opinion_routes.route('/<int:opinion_id>', methods=['PUT', 'PATCH'])
@login_required
def edit_opinion(opinion_id):
    """
    Delete an opinion by opinion id
    """
    form = OpinionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        opinion = Opinion.query.get(opinion_id)
        if not opinion:
            return {'message': 'Opinion not found'}

        opinion.content = form.data['content']

        db.session.commit()
        return opinion.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
