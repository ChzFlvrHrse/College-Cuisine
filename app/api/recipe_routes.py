from distutils.dep_util import newer
from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.forms.recipe_form import RecipeForm
from app.forms.ingredient_form import IngredientForm
from app.forms.review_form import ReviewForm
from app.models import Recipe, Ingredient, Review, db

recipe_routes = Blueprint('recipe', __name__)

@recipe_routes.route("/", methods=["GET"])
def get_all_recipes():
    all_recipes = Recipe.query.all()
    recipes = {"recipes": [recipe.to_dict() for recipe in all_recipes]}
    return recipes

# Get Recipe based on id
@recipe_routes.route("/<int:recipeId>", methods=["GET"])
@login_required
def get_recipe(recipeId):
    recipe = Recipe.query.get(recipeId)
    if recipe == None:
        return "Recipe is not available"
    return recipe.to_dict()

# New Recipe
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
            userId=current_user.id,
            username=data['username'],
            categoryId=data['categoryId']
        )

        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit Recipe
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
        old_recipe.categoryId=data['categoryId']

        db.session.commit()

        return old_recipe.to_dict()
    if form.errors:
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return form.errors

#Delete Recipe
@recipe_routes.route("/<int:recipeId>/delete", methods=['DELETE'])
@login_required
def delete_recipe(recipeId):
    recipe = Recipe.query.get(recipeId)
    db.session.delete(recipe)
    db.session.commit()
    return {
        "Message": "recipe successfully deleted",
        "satusCode": "200"
    }

#New Ingredient
@recipe_routes.route("/<int:recipeId>/ingredient/new", methods=["POST"])
@login_required
def create_ingredient(recipeId):
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        new_ingredient = Ingredient(
            ingredient=data['ingredient'],
            recipeId=recipeId
        )

        db.session.add(new_ingredient)
        db.session.commit()
        return new_ingredient.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Edit Ingredient
@recipe_routes.route("/<int:recipeId>/ingredient/<int:ingredientId>/edit", methods=["PUT"])
@login_required
def edit_ingredient(recipeId, ingredientId):
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_ingredient = Ingredient.query.get(ingredientId)
        data = form.data

        old_ingredient.ingredient = data['ingredient']

        db.session.commit()

        return old_ingredient.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete Ingredient
@recipe_routes.route("/<int:recipeId>/ingredient/<int:ingredientId>/delete", methods=["DELETE"])
@login_required
def delete_ingredient(recipeId, ingredientId):
    ingredient = Ingredient.query.get(ingredientId)
    db.session.delete(ingredient)
    db.session.commit()
    return {
    "Message": "ingredient successfully deleted",
    "statusCode": "200"
    }

# New Review
@recipe_routes.route("/<int:recipeId>/review/new", methods=['POST'])
@login_required
def create_review(recipeId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        new_review = Review(
            review=data['review'],
            rating=data['rating'],
            userId=current_user.id,
            username=data['username'],
            recipeId=recipeId
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Edit Review
@recipe_routes.route("/<int:recipeId>/review/<int:reviewId>/edit", methods=["PUT"])
@login_required
def edit_review(recipeId, reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_review = Review.query.get(reviewId)
        data = form.data

        old_review.review = data['review']
        old_review.rating = data['rating']

        db.session.commit()

        return old_review.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete Review
@recipe_routes.route("/<int:recipeId>/review/<int:reviewId>/delete", methods=["DELETE"])
@login_required
def delete_review(recipeId, reviewId):
    review = Review.query.get(reviewId)
    db.session.delete(review)
    db.session.commit()
    return {
    "Message": "review successfully deleted",
    "statusCode": "200"
    }
