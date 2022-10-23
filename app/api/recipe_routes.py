from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.forms.recipe_form import RecipeForm

from app.models import Recipe, db

recipe_routes = Blueprint('recipe', __name__)

@recipe_routes.route("/")
def get_all_recipes():
    all_recipes = Recipe.query.all()
    recipes = {"recipes": [recipe.to_dict() for recipe in all_recipes]}
    return recipes


@recipe_routes.route("/<int:recipeId>")
@login_required
def get_recipe(recipeId):
    recipe = Recipe.query.get(recipeId)
    if recipe == None:
        return "Recipe is not available"
    return recipe.to_dict()

@recipe_routes.route("/new", methods=["POST"])
@login_required
def create_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        new_recipe = Recipe(
            name=data['name'],
            description=data['description'],
            instructions=data['instructions'],
            imageUrl=data['imageUrl'],
            userId=current_user,
            categoryId=data['categoryId']
        )

        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return render_template("test.html", recipe=form)

@recipe_routes.route("/<int:recipeId>/edit", methods=["PUT"])
@login_required
def edit_recipe(recipeId):
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_recipe = Recipe.query.get(recipeId)
        data = form.data

        old_recipe.name = data['name']
        old_recipe.description = data['description']
        old_recipe.instructions = data['instructions']
        old_recipe.imageUrl = data['imageUrl']

        db.session.commit()

        return old_recipe.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@recipe_routes.route("/<int:recipeId>/delete", methods=['DELETE'])
@login_required
def delete_recipe(recipeId):
    recipe = Recipe.query.get(recipeId)
    db.session.delete(recipe)
    db.session.commit()
    return {
        "Message": "Recipe successfully deleted",
        "satusCode": "200"
    }
