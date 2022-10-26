import "./HomePage.css";
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesThunk, getOneRecipeThunk } from "../../store/recipe";

export function HomePage() {
    const user = useSelector(state => state.session.user);
    const allRecipes = useSelector(state => state.recipe);

    const dispatch = useDispatch()

    useEffect((e) => {
        dispatch(getAllRecipesThunk())
    }, []);


    const allRecipesArr = Object.values(allRecipes);
    const firstRecipe = allRecipesArr[0];

    if (!user) {
        return (
            <>
                <div id="outer-div">
                    <div className="splash">
                        <div>
                            <h3 id='cuisine'>College Kid Cuisine</h3>
                        </div>
                        <div>
                            <h5>Don't Go Hungry Cause You're Broke</h5>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
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
                                <div id='recipe-dscription'>
                                    {firstRecipe?.description}
                                </div>
                                <div id='recipe-owner'>
                                    {firstRecipe?.username}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        )
    }

}
