import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipeThunk, getOneRecipeThunk } from '../../store/recipe';
import { newReviewThunk, updateReviewThunk, deleteReviewThunk } from '../../store/review';
import { Modal } from '../../context/Modal';
import "./RecipeDetails.css"
import DeleteRecipe from '../DeleteReicpe/DeleteRecipe';

export default function RecipeDetails() {
    const [ingredientsState, setIngredientsState] = useState(false);
    const [recipeState, setRecipeState] = useState("")
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipe);
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const dispatch = useDispatch();
    const history = useHistory();

    const categories = { 1: "Breakfast", 2: "Lunch", 3: "Dinner", 4: "Beverages", 5: "Dessert", 6: "Healthy", 7: "Snack" }

    const cat = categories[recipe.categoryId];
    const catId = recipe.categoryId;

    let ingredientsArr;
    let reviewsArr;

    useEffect((e) => {
        dispatch(getOneRecipeThunk(recipeId))
    }, [dispatch, ingredientsArr, ingredientsState, reviewsArr]);

    ingredientsArr = recipe.ingredients
    reviewsArr = recipe.reviews
    console.log(reviewsArr)

    const submitReview = async (e) => {
        e.preventDefault()

        await dispatch(newReviewThunk(review, rating, userId, recipeId)).then(dispatch(getOneRecipeThunk(recipeId)))

        history.push(`/recipe/${recipeId}`)
    }

    return (
        <>
            <div className='curr-recipe-container'>
                <div className='user-recipe-info'>
                    <h1>{recipe.name}</h1>
                    <div className='username'>By {user.username}</div>
                    <div className="border"></div>
                </div>
                <div className='visuals'>
                    <div>
                        <h3>{user.username}'s Scrumptious Description mmmm...</h3>
                        <h4>{recipe.description}</h4>
                    </div>
                    <div className='food-image'>
                        <img className='food' src={recipe.imageUrl} />
                    </div>
                </div>
                <div>
                    <div className="border-2"></div>
                    <div id="category-name">
                        <div className='category'>
                            Category:
                        </div>
                        <div id='cat'>
                            {cat}
                        </div>
                    </div>
                    <div className='btns'>
                        {userId == recipe.userId ? <i class="fa-solid fa-pen-to-square"></i> : <></>}
                        {userId == recipe.userId ? <i
                            onClick={() => {
                                setShowModal(true);
                                setRecipeState(recipe)
                            }}
                            className="delete-recipe"
                            title="delete"
                            class="fa-solid fa-delete-left"
                        ></i> : <></>
                        }
                        {showModal && (
                            <Modal
                                onClose={() => setShowModal(false)}
                            >
                                <DeleteRecipe
                                    recipeId={recipeId}
                                    setShowModal={setShowModal}
                                />
                            </Modal>
                        )}
                        <div>Stars</div>
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
                        <div>
                            {ingredientsArr?.map(ingr => (
                                <div className='ingr' key={ingr.id}>{ingr.ingredient}</div>
                            ))}
                        </div>
                        <div className='border-3'></div>
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
                        {reviewsArr?.map(review => (
                            <div id='recipe-reviews'>
                                <div className='review-user'>{user.username}</div>
                                <div key={review.id}>{review.review}</div>
                                <div className='rating-edit-delete'>
                                    {userId == recipe.userId ? <i class="fa-solid fa-pen-to-square"></i> : <></>}
                                    {userId == recipe.userId ? <i
                                        // onClick={() => {
                                        //     setShowModal(true);
                                        //     setRecipeState(recipe)
                                        // }}
                                        // className="delete-recipe"
                                        // title="delete"
                                        class="fa-solid fa-delete-left"
                                    ></i> : <></>}
                                    {/* {showModal && (
                                        <Modal
                                            onClose={() => setShowModal(false)}
                                        >
                                            <DeleteRecipe
                                                recipeId={recipeId}
                                                setShowModal={setShowModal}
                                            />
                                        </Modal>
                                    )} */}
                                    <div>Stars</div>
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
                                        disabled={!review}
                                        id='sumbit-review'
                                    >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
