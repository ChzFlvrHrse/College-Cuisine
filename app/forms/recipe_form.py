from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired

def valid_image(form, field):
    imageUrl = field.data
    if not imageUrl.startswith("https") or not imageUrl.startswith("http"):
        field.data = "https://media.istockphoto.com/vectors/vector-image-of-icon-tray-with-lid-with-handsign-of-food-vector-id1222739676?k=20&m=1222739676&s=612x612&w=0&h=X4Qf2ZtR3QhDhT9Zfr9Q-aeGjHVu_PDfUE8TEe__0Nk="

class RecipeForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    instructions = TextAreaField('instruction', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[valid_image])
    userId = IntegerField("userId", validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    categoryId = IntegerField("categoryId", validators=[DataRequired()])
    submit = SubmitField("submit")
