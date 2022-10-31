import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipeThunk } from '../../store/recipe';
import { newReviewThunk } from '../../store/review';
import { deleteIngredientThunk, newIngredientThunk } from '../../store/ingredient'
import { Modal } from '../../context/Modal';
import DeleteRecipe from '../DeleteReicpe/DeleteRecipe';
import DeleteReview from '../DeleteReview/DeleteReview';
import EditReview from '../EditReview/EditReview';
import "./RecipeDetails.css"

export default function RecipeDetails() {
    let [ingredientsState, setIngredientState] = useState(0);
    const [recipeState, setRecipeState] = useState("")
    const [reviewState, setReviewState] = useState("")
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDeleteReview, setShowModalDeleteReview] = useState(false);

    const [ingredient, setIngredient] = useState("");

    const [errorValidations, setErrorValidations] = useState([])

    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipe);
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const username = user.username
    const recipeOwner = recipe.userId

    const dispatch = useDispatch();
    const history = useHistory();

    const categories = { 1: "Breakfast", 2: "Lunch", 3: "Dinner", 4: "Beverages", 5: "Dessert", 6: "Healthy", 7: "Snack" }

    const cat = categories[recipe.categoryId];
    const catId = recipe.categoryId;

    let ingredientsArr;
    let reviewsArr;
    // ingredientsArr = recipe.ingredients
    // reviewsArr = recipe.reviews

    const submitReview = async (e) => {
        e.preventDefault()

        if (checkReview() == true) {
            setRating(rating);
            setReview(review);
        } else {
            setRating(0);
            setReview("");
            await dispatch(newReviewThunk(review, rating, userId, username, recipeId)).then(dispatch(getOneRecipeThunk(recipeId)))
        }


        // history.push(`/recipe/${recipeId}`)
    }

    const submitIngredient = async (e) => {
        e.preventDefault();

        await dispatch(newIngredientThunk(ingredient, recipeId)).then(dispatch(getOneRecipeThunk(recipeId)))

        setIngredient("");

        // history.push(`/recipe/${recipeId}`)
    }

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId))
    }, [dispatch, ingredientsArr, reviewsArr, rating, review, ingredient, ingredientsState, showModal, showModalEdit, showModalEdit, showModalDeleteReview]);

    ingredientsArr = recipe.ingredients
    reviewsArr = recipe.reviews
    console.log(reviewsArr)

    let sortedReviewsByNewest = reviewsArr?.sort((a, b) => a.id - b.id);

    console.log(sortedReviewsByNewest)

    const checkReview = () => {
        const errors = [];

        if (rating == 0 || rating > 5) {
            errors.push("Please provide a rating between 1 and 5")
        }

        if (!review) {
            errors.push("Please write a review")
        }

        setErrorValidations(errors)

        if (errorValidations.length > 0) {
            return true
        } else {
            return false
        }
    }

    const ratingAvg = (reviewsArr) => {
        let ratings = 0;
        let ratingLen = reviewsArr?.length;

        reviewsArr?.forEach(review => {
            ratings += review.rating;
        })

        return Math.round((ratings * 10) / ratingLen) / 10;
    }

    const starFunc = (num) => {
        let starMap = []

        for (let i = 0; i < num; i++) {
            starMap.push(<a class="fas fa-star" style={{ color: "gold", margin: "0 .2rem" }}></a>)
        }

        for (let i = 0; i < (5 - num); i++) {
            starMap.push(<a class="fas fa-star" style={{ color: "rgba(0, 0, 0, .4)", margin: "0 .2rem" }}></a>)
        }

        return starMap.map(star => {
            return star
        })
    }

    return (
        <>
            <div className='big-contain'>
                <div className='curr-recipe-container'>
                    <div className='visuals'>
                        <div className='user-recipe-info'>
                            <h1>{recipe.name}</h1>
                            <div className='username'>By {recipe.username}</div>
                        </div>
                        <div className='food-image'>
                            <div>
                                <div>
                                    <img className='food' src={recipe.imageUrl} />
                                </div>
                                <p className='recipe-description'>
                                    {recipe.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="border-3"></div>
                        <div id="category-name">
                            <div className='category'>
                                Category:
                            </div>
                            <div id='cat'>
                                {cat}
                            </div>
                        </div>
                        <div className='btns'>
                            <div className='icon-container'>
                                {userId == recipe.userId ? <Link to={`/recipe/${recipeId}/edit`}><i title='edit recipe' class="fa-solid fa-pen-to-square" ></i></Link> : <></>}

                            </div>
                            <div>
                                {userId == recipe.userId ? <i
                                    onClick={() => {
                                        setShowModal(true);
                                        setRecipeState(recipe)
                                    }}
                                    className="delete-recipe"
                                    title="delete recipe"
                                    class="fa-solid fa-trash"
                                ></i> : <></>
                                }

                            </div>
                            {showModal && (
                                <Modal
                                    onClose={() => setShowModal(false)}
                                >
                                    <DeleteRecipe
                                        recipeId={recipeId}
                                        categoryId={recipe.categoryId}
                                        setShowModal={setShowModal}
                                    />
                                </Modal>
                            )}
                            {recipe.reviews?.length > 0 ? <div id='avg-func'>{ratingAvg(recipe.reviews)}</div> :
                                <div id='avg-func' style={{ fontSize: ".9rem", color: 'black' }}>Not Reviewed</div>}
                            <div><a id="avg-star-rating" class="fas fa-star s5"></a></div>
                            <div id='total-reviews'>({reviewsArr?.length})</div>
                        </div>
                        <div className='border-3'></div>
                    </div>
                    <div id="ingredients-reviews">
                        <div id='ingredients-container'>
                            <div>
                                <div className='ingredients'>
                                    Ingredients:
                                </div>
                            </div>
                            <div className='map-container'>
                                {ingredientsArr?.map(ingr => (
                                    <div className='ingredients-map'>
                                        <div className='ingr' key={ingr.id}>{ingr.ingredient}</div>
                                        <div className='edit-delete-ingr'>
                                            {/* <div className='inner-edit-ingr'>
                                                {userId == recipeOwner ? <i title='edit ingredient' class="fa-solid fa-pen-to-square" ></i> : <></>}
                                            </div> */}
                                            <div className='inner-delete-ingr'>
                                                {userId == recipeOwner ?
                                                    <i onClick={async (e) => { e.preventDefault(); await dispatch(deleteIngredientThunk(recipeId, ingr.id)); setIngredientState(ingredientsState += 1) }}
                                                        title='delete ingredient' class="fa-solid fa-xmark"></i> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='border-3'></div>
                            <div id="ingredients-box">
                                {userId == recipeOwner ?
                                    <form
                                        onSubmit={submitIngredient}
                                    >
                                        <input
                                            type='text'
                                            onChange={(e) => setIngredient(e.target.value)}
                                            value={ingredient}
                                            placeholder='Ingredient'
                                            className='ingredient-input'
                                        ></input>
                                        <div className='submit-ingredient-container'>
                                            <button
                                                type='submit'
                                                disabled={!ingredient}
                                                className="submit-ingredient"
                                            >
                                                Add Ingredient
                                            </button>
                                        </div>
                                    </form>
                                    : <></>}
                            </div>
                        </div>
                        <div id='reviews-container'>
                            <div className='instructions'>
                                Instructions:
                            </div>
                            <div>
                                {recipe.instructions}
                            </div>
                            <div className='border-3'></div>
                            <div className='reviews'>
                                Reviews:
                            </div>
                            {sortedReviewsByNewest?.map(review => (
                                <div id='recipe-reviews'>
                                    <div className='review-user'>{review.username}</div>
                                    <div className='the-review' key={review.id}>{review.review}</div>
                                    <div className='rating-edit-delete'>
                                        <div className='rating-done'>{starFunc(review.rating)}</div>
                                        <div className='edit-review-icon'>
                                            {userId == review.userId ? <i
                                                onClick={() => {
                                                    setShowModalEdit(true)
                                                    setReviewState(review)
                                                }}
                                                className='edit-review'
                                                title="edit review"
                                                class="fa-solid fa-pen-to-square"
                                            ></i> : <></>}
                                        </div>
                                        {showModalEdit && (
                                            <Modal
                                                onClose={() => {
                                                    setShowModalEdit(false);
                                                    setReviewState(review)
                                                }}
                                            >
                                                <EditReview
                                                    reviewId={reviewState.id}
                                                    recipeId={recipeId}
                                                    userId={userId}
                                                    setShowModalEdit={setShowModalEdit}
                                                    oldReview={reviewState}
                                                />
                                            </Modal>
                                        )}
                                        {userId == review.userId ? <i
                                            onClick={() => {
                                                setShowModalDeleteReview(true);
                                                setReviewState(review)
                                            }}
                                            className="delete-review"
                                            title="delete review"
                                            class="fa-solid fa-xmark"
                                        ></i> : <></>}
                                        {showModalDeleteReview && (
                                            <Modal
                                                onClose={() => {
                                                    setShowModalDeleteReview(false)
                                                    setReviewState(review)
                                                }}
                                            >
                                                <DeleteReview
                                                    reviewId={review.id}
                                                    recipeId={recipeId}
                                                    setShowModal={setShowModalDeleteReview}
                                                />
                                            </Modal>
                                        )}
                                    </div>
                                    <div className='border-3'></div>
                                </div>
                            ))}
                            <div className='reviews'>
                                Leave a Review!
                            </div>
                            <div id='review-box'>
                                <form
                                    onSubmit={submitReview}
                                >
                                    <div id='errors'>
                                        {errorValidations &&
                                            (errorValidations.map(error => (
                                                <div key={error.id} className='error'>
                                                    {error}
                                                </div>
                                            )))}
                                    </div>
                                    <div>
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
                                    <div id='submit'>
                                        <button
                                            type='submit'
                                            // disabled={!review || rating == 0}
                                            id='sumbit-review'
                                            onClick={checkReview}
                                        >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
