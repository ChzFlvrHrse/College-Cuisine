import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipeThunk, getOneRecipeThunk } from '../../store/recipe';
import "./RecipeDetails.css"

export default function RecipeDetails() {
    const [ingredientsState, setIngredientsState] = useState(false)

    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipe);
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const dispatch = useDispatch();
    const history = useHistory();

    const categories = { 1: "Breakfast", 2: "Lunch", 3: "Dinner", 4: "Beverages", 5: "Dessert", 6: "Healthy", 7: "Snack" }

    const cat = categories[recipe.categoryId];
    const catId = recipe.categoryId;

    let ingredientsArr;

    useEffect((e) => {
        dispatch(getOneRecipeThunk(recipeId))
    }, [dispatch, ingredientsArr, ingredientsState]);

    ingredientsArr = recipe.ingredients
    console.log(recipe)

    const onDelete = async (e) => {
        e.preventDefault()



        await dispatch(deleteRecipeThunk(recipeId))

        history.push(`/category/${cat}/${catId}`)
    }


    return (
        <>
            <div className='curr-recipe-container'>
                <div className='user-recipe-info'>
                    <h1>{recipe.name}</h1>
                    <div className='username'>By {user.username}</div>
                    <div className="border"></div>
                </div>
                <div className='visuals'>
                    <div>
                        <h3>{user.username}'s Scrumptious Description mmmm...</h3>
                        <h4>{recipe.description}</h4>
                    </div>
                    <div className='food-image'>
                        <img className='food' src={recipe.imageUrl} />
                    </div>
                </div>
                <div>
                    <div className="border-2"></div>
                    <div id="category-name">
                        <div className='category'>
                            Category:
                        </div>
                        <div id='cat'>
                            {cat}
                        </div>
                    </div>
                    <div className='btns'>
                        {userId == recipe.userId ?
                            <Link to={`/recipe/${recipeId}/edit`}><button>Edit Recipe</button></Link>
                            : <></>}
                        {userId == recipe.userId ?
                            <button onClick={onDelete}>Delete Recipe</button>
                            : <></>}
                        <div>Rating</div>
                    </div>
                    <div className='border-3'></div>
                </div>
                <div id="ingredients-reviews">
                    <div id='ingredients-container'>
                        <div>
                            <div className='ingredients'>
                                Ingredients:
                            </div>
                        </div>
                        <div>
                            {ingredientsArr?.map(ingr => (
                                <div className='ingr' key={ingr.id}>{ingr.ingredient}</div>
                            ))}
                        </div>
                        <div className='border-3'></div>
                    </div>
                    <div id='reviews-container'>
                        <div className='instructions'>
                            Instructions:
                        </div>
                        <div>
                            {recipe.instructions}
                        </div>
                        <div className='border-3'></div>
                        <div className='reviews'>
                                Reviews:
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
