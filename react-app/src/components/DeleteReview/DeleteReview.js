import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/review";
import { useHistory } from "react-router-dom";
import './DeleteReview.css'
import { getOneRecipeThunk } from "../../store/recipe";

export default function DeleteReview({ reviewId, recipeId, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(recipeId, reviewId)).then(dispatch(getOneRecipeThunk(recipeId)));
        setShowModal(false);
        history.push(`/recipe/${recipeId}`)
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    return (
        <div className="DeleteComment-outer">
            <form className="DeleteComment-inner" onSubmit={handleSubmit2} autoComplete="off">
                <h4 id="statement">Delete Review</h4>
                <div></div>
                <h5 id="assurance">Are you sure you want to delete this review?</h5>
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
