import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesThunk } from '../../store/recipe';
import "./Category.css";

export default function Category() {
    const recipes = useSelector(state => state.recipe)
    const user = useSelector(state => state.session.user)

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

    if (!user) {
        return (
            <div className="login-containerPNF">
                <div className="inner-loginPNF">
                    <div id="login-bannerPNF">
                        <h4 id="to-klickr1">Sign in Required</h4>
                        {/* <h4 id="to-klickr1">to view this content</h4> */}
                        <div className="button">
                            <Link to='/login'>
                                <button className="loginform-bttns">
                                    Click here sign in
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
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
                                            <img
                                                className="recipe-img"
                                                src={recipe.imageUrl}
                                                alt='https://icsnorthernltd.com/images/product-1.jpg'
                                                onError={e => { e.currentTarget.src = 'https://icsnorthernltd.com/images/product-1.jpg' }}
                                            />
                                        </div>
                                        <div className="recipe-name-2">
                                            <div className='nested-recipe-name'>
                                                {recipe.name}
                                            </div>
                                            <div id="recipe-user">
                                                By: {recipe.username}
                                            </div>
                                        </div>
                                        <div className="recipe-stars">
                                            <div id="rating-information">
                                                {recipe.reviews?.length > 0 ? <div>{ratingAvg(recipe.reviews)}</div> :
                                                    <a style={{ fontSize: ".9rem", color: 'black' }}>Not Reviewed</a>}
                                                <a class="fas fa-star s5"></a>
                                                <div id='total-reviews'>({recipe.reviews?.length})</div>
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

}
