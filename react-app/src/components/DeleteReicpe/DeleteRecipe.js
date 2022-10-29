import React from "react";
import { useDispatch } from "react-redux";
import { deleteRecipeThunk } from "../../store/recipe";
import { getAllRecipesThunk } from "../../store/recipe";
import { useHistory } from "react-router-dom";
import './DeleteRecipe.css'

export default function DeleteRecipe({ recipeId, categoryId, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const categories = ['', 'Breakfast', 'Lunch', 'Dinner', 'Beverages', 'Dessert', 'Healthy', 'Snack']

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteRecipeThunk(recipeId)).then(dispatch(getAllRecipesThunk()));
        setShowModal(false);
        history.push(`/category/${categories[categoryId]}/${categoryId}`)
        // history.push('/')
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };

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
