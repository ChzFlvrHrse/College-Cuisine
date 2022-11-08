from sqlalchemy import null
from .db import db
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.VARCHAR(255), nullable=False)
    instructions = db.Column(db.VARCHAR(255), nullable=False)
    imageUrl = db.Column(db.String, nullable=False, default="https://i.dlpng.com/static/png/6892771_preview.png")
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    username = db.Column(db.String, nullable=False)
    categoryId = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    ingredients = db.relationship("Ingredient", backref="recipe", cascade="all, delete-orphan")
    reviews = db.relationship("Review", backref="recipe", cascade="all, delete-orphan")
    # categories = db.relationship('Category', backref='recipe')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "instructions": self.instructions,
            "imageUrl": self.imageUrl,
            'userId': self.userId,
            'username': self.username,
            'categoryId': self.categoryId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            "ingredients": [ingredient.to_dict() for ingredient in self.ingredients],
            "reviews": [review.to_dict() for review in self.reviews]
        }
