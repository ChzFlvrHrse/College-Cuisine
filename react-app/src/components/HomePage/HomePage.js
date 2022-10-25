import "./HomePage.css";
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesThunk, getOneRecipeThunk } from "../../store/recipe";

export function HomePage() {
    const user = useSelector(state => state.session.user);
    const allRecipes = useSelector(state => state.recipe)

    const dispatch = useDispatch()

    useEffect((e) => {
        dispatch(getAllRecipesThunk())
    }, []);

    const allRecipesArr = Object.values(allRecipes);
    console.log(allRecipesArr[0])

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
                <div id="outer-div">
                    <div className="splash">
                        <div>
                            <h3 id='cuisine'>Let's Eat {user.username}!</h3>
                        </div>
                        <div>
                            <h4>N$0 Money N$0 Problem!</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
