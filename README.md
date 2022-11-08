# College Cuisine
This is a clone of [Cooking By NY Times](https://cooking.nytimes.com/)

The best place to find affordable options for college kids who are tight fisted and hungry! Get access to the [College Cuisine MVP](https://college-cuisine.onrender.com/)

# Tech Stack

  Frameworks, Libraries, and Platform:

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

  Database:

  ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

  Hosting:

  ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

# Key Functionalities

## Recipes, Reviews (full CRUD)

College Cuisine allows users to add recipes that include basic information such as the recipe name, description, instructions for preparation, an image of the final product and the category the recipe belongs to. If the user owns the recipe they are able to edit and delete the recipe. Users are also able to leave 1 review per recipe and leave a star rating between 1 and 5. If the user owns the review they can edit and delete the contents of the review.

## Ingredients (3/4 CRUD)

College Cuisine enables users to add and delete ingredients to recipes that they are the owner of.

# Preview Images

## Not Logged In Splash/Homepage
![No User Splash](https://user-images.githubusercontent.com/87671074/199763795-008a1c6d-b72b-4672-b0d1-68b442762faa.png)

## Logged In Splash/Homepage
![User Splash](https://user-images.githubusercontent.com/87671074/199763858-c31bbf60-3c13-4a0a-b736-927d84460dea.png)

## Categories
![Categories Page](https://user-images.githubusercontent.com/87671074/199764308-5e652008-bafb-43dc-bb61-816c9cb5d912.png)

## Recipe Details Top
![Recipe Details Top](https://user-images.githubusercontent.com/87671074/199764364-6fc3d9a7-2dc7-4fdb-aaff-1490d1b82a2e.png)

## Recipe Details Bottom
![Recipe Details Bottom](https://user-images.githubusercontent.com/87671074/199764423-fd2f1295-6b21-4dc1-b09a-c8271205bb63.png)

## Add a Recipe
![Add Recipe](https://user-images.githubusercontent.com/87671074/199764700-07f9c995-14cf-4a13-a597-460a3d3d7e57.png)

## Edit Recipe
![Edit Recipe](https://user-images.githubusercontent.com/87671074/199764746-fbc2ca6a-5ead-4e42-a144-a34c71dee6ba.png)

# Clone College Cuisine Locally
- git clone https://github.com/ChzFlvrHrse/College-Cuisine.git
- cd into college-cuisine folder and ``` run pipenv install ```
- Open two terminal paths for both colleg-cuisine and react-app.
- Under college-cuisine ``` run pipenv shell  then flask run, for react-app```
- In the shell cd'd into the react-app folder enter ``` run npm install ```
- Create a .env file under the root of the backend folder with the following contents:
  ``` REACT_APP_BASE_URL=http://localhost:5000 ```


## Getting started
Clone the repository then install dependencies

using ```pipenv install -r requirements.txt ```
Create a .env file based on the example with proper settings for your development environment


 ``` Get into your pipenv run pipenv shell,flask db upgrade, flask seed all, flask run```



# Environment Info
```
DATABASE_URL=sqlite:///dev.db
FLASK_DEBUG=True
SECRET_KEY=«generate_strong_secret_here» 
```

``` 
Inside react-app create another .env and add     REACT_APP_BASE_URL=http://localhost:5000 
```

# Features to Add
- Search Bar
- Subscribe to a user
- Comment on reviews
- Add multiple photos

# Challenges 
- Getting all error handlers to work properly

# Things to Improve
- Optimze queries
- Clean up CSS and class naming
