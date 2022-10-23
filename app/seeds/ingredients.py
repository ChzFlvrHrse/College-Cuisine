from app.models import db, Ingredient, ingredient


# Adds a demo user, you can add other users here if you want
def seed_ingredient():
    # Cereal
    cereal = Ingredient(
        ingredient='Any type of Cereal', recipeId=1)
    milk = Ingredient(
        ingredient='Anything but spoiled Milk', recipeId=1)

    # Pancakes
    flour = Ingredient(
        ingredient='Flour', recipeId=2)
    milk = Ingredient(
        ingredient='Milk', recipeId=2)
    baking_powder = Ingredient(
        ingredient='Baking Powder', recipeId=2)
    butter = Ingredient(
        ingredient='Butter', recipeId=2)
    pancake_egg = Ingredient(
        ingredient='Egg', recipeId=2)

    #Eggs
    egg = Ingredient(
        ingredient='Egg', recipeId=3)
    salt = Ingredient(
        ingredient='Salt', recipeId=3)

    db.session.add(cereal)
    db.session.add(milk)
    db.session.add(flour)
    db.session.add(baking_powder)
    db.session.add(butter)
    db.session.add(pancake_egg)
    db.session.add(egg)
    db.session.add(salt)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredient():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
