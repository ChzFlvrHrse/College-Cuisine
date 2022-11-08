from .db import db
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.VARCHAR(50), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'ingredient': self.ingredient,
            "recipeId": self.recipeId,
            "created_at": self.created_at,
            "updated_at": self.created_at
        }
