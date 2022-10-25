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
                <div>
                    <div id="lower-container">
                        {recipeType.map(recipe => (
                            <div key={recipe.id}>
                                <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
