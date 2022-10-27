import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOneRecipeThunk } from "../../store/recipe";
import { updateReviewThunk } from "../../store/review";
import "./EditReview.css"


function EditReview({ reviewId, recipeId, userId, setShowModalEdit, oldReview }) {
    const dispatch = useDispatch();
    const username = oldReview.username

    const [review, setReview] = useState(oldReview.review);
    const [rating, setRating] = useState(oldReview.rating)
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        const formValidationErrors = [];

        if (review.length > 500) {
            formValidationErrors.push("Reviews must be no more than 500 characters");
        }
        if (review.length < 1) {
            formValidationErrors.push("Reviews must be more than 1 character");
        }

        if (rating === 0) {
            formValidationErrors.push("Please rate this recipe")
        }

        //
        setErrors(formValidationErrors);
    }, [review, rating]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.length <= 0) {
            return dispatch(
                updateReviewThunk(review, rating, userId, username, recipeId, reviewId)
            ).then(() => setShowModalEdit(false)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }).then(dispatch(getOneRecipeThunk(recipeId)));
        }
        return errors;
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setShowModalEdit(false);
    };

    return (
        <div className="create-comment-container">
            <div className="create-comment-wrapper">
                <h3 className="edit-comment-title" style={{ fontWeight: "300" }}>Edit Review here:</h3>
                <div>
                    <form
                        onSubmit={handleSubmit2}
                        autoComplete="off"
                    >
                        <div className="errorHandlingContainer">
                            {errors.length > 0 && (
                                <div className="HeaderErrorStyling">
                                    <ul className="UlBulletErrorStyling">
                                        {errors.map((error, idx) => (
                                            <li className="ErrorPoints" key={idx}>
                                                {error}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div id='review-box'>
                            <div id="rating-stars">
                                <div id='rating'>Rating</div>
                                <div class="star-wrapper">
                                    <a
                                        onClick={() => setRating(5)}
                                        value={rating} class="fas fa-star s1"
                                    ></a>
                                    <a
                                        onClick={() => setRating(4)}
                                        value={rating} class="fas fa-star s2"
                                    ></a>
                                    <a
                                        onClick={() => setRating(3)}
                                        value={rating} class="fas fa-star s3"
                                    ></a>
                                    <a
                                        onClick={() => setRating(2)}
                                        value={rating} class="fas fa-star s4"
                                    ></a>
                                    <a
                                        onClick={() => setRating(1)}
                                        value="5" class="fas fa-star s5"
                                    ></a>
                                </div>
                                <script src="https://kit.fontawesome.com/5ea815c1d0.js"></script>
                                <div class="wraper">
                                    <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="gitlabBilal" data-color="#FFDD00" data-emoji="" data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff"></script>
                                </div>
                            </div>
                            <input
                                type="number"
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                            ></input>
                            <textarea
                                placeholder='Review'
                                type='text'
                                onChange={(e) => setReview(e.target.value)}
                                value={review}
                            ></textarea>
                        </div>
                        <div className="done-edit-container">
                            <button
                                type='submit'
                                disabled={errors.length > 0}
                                id='sumbit-edit'
                                className="done-edit"
                                onClick={handleSubmit}
                            >Submit
                            </button>
                            <button id="edit-comment-cancel" className="done-edit" onClick={() => setShowModalEdit(false)} type="submit">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditReview;
