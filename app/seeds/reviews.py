from app.models import db, Review


# Adds a demo user, you can add other users here if you want
def seed_review():
    cereal_review = Review(
        review="Great Cereal!", rating=5, userId=1, username="Demo", recipeId=1)
    pancakes_review = Review(
        review="Great Pancakes!", rating=5, userId=2, username="marnie", recipeId=2)
    eggs_review = Review(
        review="Great Eggs!", rating=5, userId=3, username="bobbie", recipeId=3)

    db.session.add(cereal_review)
    db.session.add(pancakes_review)
    db.session.add(eggs_review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_review():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
