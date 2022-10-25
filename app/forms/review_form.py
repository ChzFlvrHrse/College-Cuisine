from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired()])
    rating = IntegerField("rating", validators=[DataRequired()])
    userId = IntegerField("userId", validators=[DataRequired()])
    recipeId = IntegerField("recipeId", validators=[DataRequired()])
    submit = SubmitField("submit")
