from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.VARCHAR(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    username = db.Column(db.String, nullable=False)
    recipeId =db.Column(db.Integer, db.ForeignKey("recipes.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'review': self.review,
            'userId': self.userId,
            'username': self.username,
            'recipeId': self.recipeId,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
