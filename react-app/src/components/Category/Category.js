import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesThunk } from '../../store/recipe';
import "./Category.css";

export default function Category() {
    const recipes = useSelector(state => state.recipe)

    const { categoryType, categoryId } = useParams()

    const dispatch = useDispatch()

    useEffect((e) => {
        dispatch(getAllRecipesThunk())
    }, []);

    const recipesArr = Object.values(recipes)
    const recipeType = recipesArr.filter(recipe => recipe.categoryId == categoryId)
    // console.log(recipeType)

    const ratingAvg = (reviewsArr) => {
        let ratings = 0;
        let ratingLen = reviewsArr?.length;

        reviewsArr?.forEach(review => {
            ratings += review.rating;
        })

        return Math.round((ratings * 10) / ratingLen) / 10;
    }

    return (
        <>
            <div className='big-category-container'>
                <div id="category-container">
                    <div id="inner-container">
                        <div id="cat-label">
                            <h1>Category:</h1>
                            <h1 className='cat-type'>{categoryType}</h1>
                        </div>
                    </div>
                    <div id="inner-container">
                        <div id="bottom-container">
                            {recipeType?.map(recipe => (
                                <Link to={`/recipe/${recipe.id}`} className="recipe-info-container">
                                    <div>
                                        <img className="recipe-img" src={recipe.imageUrl} />
                                    </div>
                                    <div className="recipe-name-2">
                                        <div>
                                            {recipe.name}
                                        </div>
                                        <div id="recipe-user">
                                            By: {recipe.username}
                                        </div>
                                    </div>
                                    <div className="recipe-stars">
                                        <div>
                                            {recipe.reviews?.length > 0 ? ratingAvg(recipe.reviews) :
                                                <a style={{ fontSize: ".9rem", color: 'black' }}>Not Reviewed</a>}
                                            <a class="fas fa-star s5"></a>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
