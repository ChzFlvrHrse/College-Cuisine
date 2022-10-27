from .db import db
from datetime import datetime

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.VARCHAR(75), nullable=False)

    recipes = db.relationship("Recipe", backref="category")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
