from app.models import db, Recipe


# Adds a demo user, you can add other users here if you want
def seed_recipe():
    cereal = Recipe(
        name='Cereal', description='Cereal in a bowl filled with milk', instructions='Get bowl. Fill with milk. Eat with spoon', imageUrl="https://www.cspinet.org/sites/default/files/styles/700x530/public/2021-11/december21_bn_hero_700x530.jpg?h=61bc1599", userId=1, categoryId=1)
    pancakes = Recipe(
        name='Pancakes', description='Fluffy and savory cakes for a morning feast!', instructions='Mix and pour batter into skillet until cooked', imageUrl="https://www.mashed.com/img/gallery/basic-homemade-pancake-recipe/l-intro-1623681422.jpg", userId=2, categoryId=1)
    eggs = Recipe(
        name='Eggs', description='Tasty eggs', instructions='Whisk eggs and cook in pan', imageUrl="https://cdn.loveandlemons.com/wp-content/uploads/2021/05/scrambled-eggs.jpg", userId=3, categoryId=1)

    db.session.add(cereal)
    db.session.add(pancakes)
    db.session.add(eggs)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipe():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
