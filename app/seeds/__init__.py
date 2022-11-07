from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipe, undo_recipe
from .ingredients import seed_ingredient, undo_ingredient
from .reviews import seed_review, undo_review
from .categories import seed_categories, undo_categories
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():

    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()

    seed_users()
    seed_recipe()
    seed_ingredient()
    seed_review()
    seed_categories()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_recipe()
    undo_ingredient()
    undo_review()
    undo_categories()
