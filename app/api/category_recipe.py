from distutils.dep_util import newer
from logging import LogRecord
from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import Recipe, db

category_routes = Blueprint('cateogory', __name__)

@category_routes.route("/<int:categoryId>")
@login_required
def get_category(categoryId):
    category_recipes = Recipe.query.get(Recipe.categoryId == categoryId)
    return category_recipes.to_dict()

