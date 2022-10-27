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

    return (
        <>
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
                                </div>
                                <div className="recipe-stars">
                                    <div>Stars</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
