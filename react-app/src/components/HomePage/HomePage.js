import "./HomePage.css";
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesThunk, getOneRecipeThunk } from "../../store/recipe";
import collegeCuisine from './college-cuisine-logo.png'

export function HomePage() {
    const user = useSelector(state => state.session.user);
    const allRecipes = useSelector(state => state.recipe);

    const dispatch = useDispatch()

    useEffect((e) => {
        dispatch(getAllRecipesThunk())
    }, []);


    const allRecipesArr = Object.values(allRecipes);
    console.log(allRecipesArr)
    const firstRecipe = allRecipesArr[0];

    // let rating = 0;

    const ratingAvg = (reviewsArr) => {
        let ratings = 0;
        let ratingLen = reviewsArr?.length;

        reviewsArr?.forEach(review => {
            ratings += review.rating;
        })

        return Math.round((ratings*10)/ratingLen) / 10;
    }

    if (!user) {
        return (
            <>
                <div id="outer-outer">
                    <div id="outer-div">
                        <div className="splash">
                            <div id='logo'>
                                <img src={collegeCuisine}  alt='College Cuisine'/>
                            </div>
                            <div>
                                <h5>Don't Go Hungry Cause You're Broke</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
            <div className="the-big-contain">
                <div id="homepage-container">
                    <div className="top-container">
                        <Link to={`/recipe/${firstRecipe?.id}`} className="featured-link">
                            <img className="featured" src={firstRecipe?.imageUrl} />
                            <div className="on-top">
                                <div id="recipe-of-the-day">
                                    <div>Recipe</div>
                                    <div>of the Day</div>
                                </div>
                            </div>
                            <div className="on-top-2">
                                <div id="recipe-name">
                                    {firstRecipe?.name}
                                </div>
                                <div id='recipe-description'>
                                    {firstRecipe?.description}
                                </div>
                                <div id='recipe-owner'>
                                    {firstRecipe?.username}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div id="bottom-container">
                    {allRecipesArr?.map(recipe => (
                        <Link to={`/recipe/${recipe.id}`} className="recipe-info-container">
                            <div>
                                <img className="recipe-img" src={recipe.imageUrl} />
                            </div>
                            <div className="recipe-name-2">
                                <div className="nested-recipe-name">
                                    {recipe.name} 
                                </div>
                                <div id="recipe-user">
                                    By: {recipe.username}
                                </div>
                            </div>
                            <div className="recipe-stars">
                                <div id="rating-information">
                                    {recipe.reviews?.length > 0 ? <div>{ratingAvg(recipe.reviews)}</div>:
                                    <a style={{fontSize: ".9rem", color: 'black'}}>Not Reviewed</a>}
                                    <a class="fas fa-star s5"></a>
                                    <div id='total-reviews'>({recipe.reviews?.length})</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            </>
        )
    }

}
