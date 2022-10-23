from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_review():
    breakfast = Category(
        name='Breakfast')
    lunch = Category(
        name='Lunch')
    dinner = Category(
        name='Dinner')
    beverage = Category(
        name='Beverages')
    dessert = Category(
        name="Dessert")
    healthy = Category(
        name='Healthy')
    snack = Category(
        name='Snack')

    db.session.add(breakfast)
    db.session.add(lunch)
    db.session.add(dinner)
    db.session.add(beverage)
    db.session.add(dessert)
    db.session.add(healthy)
    db.session.add(snack)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_review():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
