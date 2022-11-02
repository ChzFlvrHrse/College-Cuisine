import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipeThunk } from "../../store/recipe";
import { getAllRecipesThunk } from "../../store/recipe";
import { useHistory, Link } from "react-router-dom";
import './DeleteRecipe.css'

export default function DeleteRecipe({ recipeId, categoryId, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const categories = ['', 'Breakfast', 'Lunch', 'Dinner', 'Beverages', 'Dessert', 'Healthy', 'Snack']

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteRecipeThunk(recipeId)).then(dispatch(getAllRecipesThunk()));
        setShowModal(false);
        history.push(`/category/${categories[categoryId]}/${categoryId}`)
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    if (!user) {
        return (
            <div className="login-containerPNF">
                <div className="inner-loginPNF">
                    <div id="login-bannerPNF">
                        <h4 id="to-klickr1">You are not authorized</h4>
                        <h4 id="to-klickr1">to perform this action</h4>
                        <div className="button">
                            <Link to='/'>
                                <button className="loginform-bttns">
                                    Click here to go home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="DeleteComment-outer">
                <form className="DeleteComment-inner" onSubmit={handleSubmit2} autoComplete="off">
                    <h4 id="statement">Delete Recipe</h4>
                    <div></div>
                    <h5 id="assurance">Are you sure you want to delete this recipe?</h5>
                    <div className="deleteSongButtons">
                        <button
                            className="submitDeleteComment"
                            onClick={handleSubmit}
                            type="submit"
                        >
                            Delete
                        </button>
                        <button
                            className="cancelDeleteComment"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}
