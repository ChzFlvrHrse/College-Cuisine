import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipeThunk } from '../../store/recipe';
import { newReviewThunk } from '../../store/review';
import { deleteIngredientThunk, newIngredientThunk } from '../../store/ingredient'
import { Modal } from '../../context/Modal';
import { Modal2 } from '../../context/Modal2';
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

    const [errorValidations, setErrorValidations] = useState([]);
    const [ingredientsError, setIngredientsError] = useState([]);

    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipe);
    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const username = user?.username
    const recipeOwner = recipe?.userId

    const dispatch = useDispatch();

    const categories = { 1: "Breakfast", 2: "Lunch", 3: "Dinner", 4: "Beverages", 5: "Dessert", 6: "Healthy", 7: "Snack" }

    const cat = categories[recipe.categoryId];

    let ingredientsArr;
    let reviewsArr;

    const submitReview = async (e) => {
        e.preventDefault()

        if (checkReview() === true) {
            setRating(rating)
            setReview(review)
        } else {
            setRating(0);
            setReview("");
            await dispatch(newReviewThunk(review, rating, userId, username, recipeId)).then(dispatch(getOneRecipeThunk(recipeId)))
        }
    }

    const submitIngredient = async (e) => {
        e.preventDefault();

        if (!ingredient || !ingredient.split(" ").join("").length) {
            setIngredientsError(["Please write an ingredient"])
        } else {
            await dispatch(newIngredientThunk(ingredient, recipeId)).then(dispatch(getOneRecipeThunk(recipeId)))

            setIngredient("");
        }
    }

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId))
    }, [dispatch, ingredientsArr, reviewsArr, rating, review, ingredient, ingredientsState, showModal, showModalEdit, showModalEdit, showModalDeleteReview]);

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId))
    }, [dispatch])

    ingredientsArr = recipe.ingredients
    reviewsArr = recipe.reviews

    let sortedReviewsByNewest = reviewsArr?.sort((a, b) => a.id - b.id);

    const checkReview = () => {
        const errors = [];

        if (rating <= 0 || rating > 5) {
            errors.push("Please provide a rating between 1 and 5")
        }

        if (!review || !review.split(" ").join("").length) {
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

    useEffect(() => {
        const errors = [];

        if (ingredient.length > 30) errors.push("Ingredient cannot exceed 30 characters");

        setIngredientsError(errors);

    }, [ingredient]);

    useEffect(() => {
        const errors = [];

        if (review.length > 250) errors.push("Review cannot exceed 250 characters")

        const reviewed = reviewsArr?.filter(rev => rev.userId === userId)
        if (reviewed?.length > 0) {
            errors.push("You have already reviewed this recipe")
        }

        setErrorValidations(errors);
    }, [review, rating])


    const reviewed = reviewsArr?.filter(rev => rev.userId === userId)

    if (!user) {
        return (
            <div className="login-containerPNF">
                <div className="inner-loginPNF">
                    <div id="login-bannerPNF">
                        <h4 id="to-klickr1">You are not authorized</h4>
                        <h4 id="to-klickr1">to view this content</h4>
                        <div className="button">
                            <Link to='/'>
                                <button className="loginform-bttns">
                                    Click here to go back home
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
                                        <img
                                            className='food'
                                            src={recipe.imageUrl}
                                            alt='https://icsnorthernltd.com/images/product-1.jpg'
                                            onError={e => { e.currentTarget.src = 'https://icsnorthernltd.com/images/product-1.jpg' }}
                                        />
                                    </div>
                                    <div className='recipe-description-box'>
                                        <p className='recipe-description'>
                                            {recipe.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="border-4"></div>
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
                                    <Modal2
                                        onClose={() => setShowModal(false)}
                                    >
                                        <DeleteRecipe
                                            recipeId={recipeId}
                                            categoryId={recipe.categoryId}
                                            setShowModal={setShowModal}
                                        />
                                    </Modal2>
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
                                    {userId == recipe.userId ?
                                        <div className='ingredients'>Your Ingredients: ({ingredientsArr?.length})</div>
                                        : <div className='ingredients'>Ingredients: ({ingredientsArr?.length})</div>}

                                </div>
                                <div className='map-container'>
                                    {ingredientsArr?.map(ingr => (
                                        <div>
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
                                            <div className='border-3'></div>
                                        </div>
                                    ))}
                                </div>
                                <div id="ingredients-box">
                                    {userId == recipeOwner ?
                                        <form
                                            onSubmit={submitIngredient}
                                        >
                                            <div id='errors'>
                                                {ingredientsError &&
                                                    (ingredientsError.map(error => (
                                                        <div key={error.id} className='error'>
                                                            {error}
                                                        </div>
                                                    )))}
                                            </div>
                                            <input
                                                type='text'
                                                onChange={(e) => setIngredient(e.target.value)}
                                                value={ingredient}
                                                placeholder='Add an Ingredient'
                                                className='ingredient-input'
                                            ></input>
                                            <div className='submit-ingredient-container'>
                                                <button
                                                    type='submit'
                                                    className="submit-ingredient"
                                                    disabled={ingredientsError.length > 0}
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
                                <div className='instructions-box'>
                                    <div>
                                        {recipe.instructions}
                                    </div>
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
                                                <Modal2
                                                    onClose={() => {
                                                        setShowModalDeleteReview(false)
                                                    }}
                                                >
                                                    <DeleteReview
                                                        reviewId={reviewState.id}
                                                        recipeId={recipeId}
                                                        setShowModal={setShowModalDeleteReview}
                                                    />
                                                </Modal2>
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
                                                        value={rating} className={rating >= 5 ? "fas fa-star s5-checked" : "fas fa-star s5"}
                                                    ></a>
                                                    <a
                                                        onClick={() => setRating(4)}
                                                        value={rating} className={rating >= 4 ? "fas fa-star s4-checked" : "fas fa-star s4"}
                                                    ></a>
                                                    <a
                                                        onClick={() => setRating(3)}
                                                        value={rating} className={rating >= 3 ? "fas fa-star s3-checked" : "fas fa-star s3"}
                                                    ></a>
                                                    <a
                                                        onClick={() => setRating(2)}
                                                        value={rating} className={rating >= 2 ? "fas fa-star s2-checked" : "fas fa-star s2"}
                                                    ></a>
                                                    <a
                                                        onClick={() => setRating(1)}
                                                        value={rating} className={rating >= 1 ? "fas fa-star s1-checked" : "fas fa-star s1"}
                                                    ></a>
                                                </div>
                                                <div className='review-length'>Char Count:{review.length}</div>
                                                <script src="https://kit.fontawesome.com/5ea815c1d0.js"></script>
                                                <div class="wraper">
                                                    <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="gitlabBilal" data-color="#FFDD00" data-emoji="" data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff"></script>
                                                </div>
                                            </div>
                                            <textarea
                                                placeholder='Review (250 Char Max)'
                                                type='text'
                                                onChange={(e) => setReview(e.target.value)}
                                                value={review}
                                            ></textarea>
                                        </div>
                                        <div id='submit'>
                                            <button
                                                type='submit'
                                                id='sumbit-review'
                                                onClick={checkReview}
                                                disabled={reviewed?.length > 0}
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
}
