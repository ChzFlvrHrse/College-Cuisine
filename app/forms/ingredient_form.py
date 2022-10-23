from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class IngredientForm(FlaskForm):
    ingredient = StringField("ingredient", validators=[DataRequired()])
    submit = SubmitField("submit")
