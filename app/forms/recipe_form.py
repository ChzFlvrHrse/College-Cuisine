from unicodedata import category
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def valid_image(form, field):
    imageUrl = field.data
    if imageUrl == None or not imageUrl.startswith("https://") or not imageUrl.startswith("http://"):
        field.data = "https://i.dlpng.com/static/png/6892771_preview.png"

class RecipeForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    instructions = TextAreaField('instruction', validators=[DataRequired()])
    imageUrl = StringField('imageUrl')
    userId = IntegerField("userId", validators=[DataRequired()])
    categoryId = IntegerField("categoryId", validators=[DataRequired()])
    submit = SubmitField("submit")
