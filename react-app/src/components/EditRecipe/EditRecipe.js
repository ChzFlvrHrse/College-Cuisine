import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneRecipeThunk, updateRecipeThunk, getAllRecipesThunk } from "../../store/recipe";
import "./EditRecipe.css"

export default function EditRecipe() {
    const { recipeId } = useParams();

    const target = useSelector(state => state.recipe);
    const allRecipes = useSelector(state => state.recipe);
    const user = useSelector(state => state.session.user);

    const userId = user?.id;
    const username = user?.username


    if (target && target.userId === user.id) {
        localStorage.setItem('name', target?.name)
        localStorage.setItem('description', target?.description)
        localStorage.setItem('instructions', target?.instructions)
        localStorage.setItem('imageUrl', target?.imageUrl)
        localStorage.setItem('categoryId', target?.categoryId)
    }

    const [name, setName] = useState(localStorage.getItem('name'));
    const [description, setDescription] = useState(localStorage.getItem('description'));
    const [instructions, setInstructions] = useState(localStorage.getItem('instructions'));
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl'));
    const [categoryId, setCategoryId] = useState(localStorage.getItem('categoryId'));
    const [errorValidators, setErrorValidators] = useState([])

    useEffect(() => {
        const errors = []

        if (!name || !name.split(" ").join("").length) errors.push("Please name your recipe")
        if (name.length > 40) errors.push("Recipe name cannot exceed 40 characters")

        if (!description || !description.split(" ").join("").length) errors.push("Describe your recipe")
        if (description.length > 250) errors.push("Description cannot exceed 250 characters")

        if (!instructions || !instructions.split(" ").join("").length) errors.push("Please provide instructions")
        if (instructions.length > 250) errors.push("Instructions cannot exceed 250 characters")

        if (!categoryId || categoryId == "Pick a Category") errors.push("Please select a category")

        setErrorValidators(errors)

    }, [name, description, instructions, categoryId])

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId))
    }, [dispatch, recipeId]);

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errorValidators.length > 0) {
            return alert("There was something wrong with your recipe")
        }

        await dispatch(updateRecipeThunk(name, description, instructions, imageUrl, userId, username, categoryId, recipeId)).then(() => dispatch(getOneRecipeThunk(recipeId)));

        history.push(`/recipe/${recipeId}`)
    }

    let allRecipesArr = Object.values(allRecipes);
    let allRecipesFilter = allRecipesArr?.filter(recipe => recipe.id == recipeId)
    let backup = allRecipesFilter[0];
    console.log(backup);

    let owner = target?.userId

    if (!owner) {
        owner = backup?.userId
    }

    if (!user || userId !== owner) {
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
                <div className="big-add">
                    <div className="recipe-form-container">
                        {errorValidators.length > 0 && (
                            <div className="form-errors-container">
                                {errorValidators.map((error) => (
                                    <div className="add-recipe-error" key={error}>{error}</div>
                                ))}
                            </div>
                        )}
                        <form
                            onSubmit={handleSubmit}
                            className='add-recipe'
                        >
                            <Link to={`/recipe/${recipeId}`} className="back-to-recipe">
                                <i class="fa-solid fa-arrow-left"></i>
                                <div id='back'>
                                    Back to Recipe
                                </div>
                            </Link>
                            <div className="add-your-recipe">Edit Your Recipe!</div>
                            <div className="info">
                                <label>Name of Recipe</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setName(event.target.value)}
                                    value={name}
                                    placeholder="Name of Recipe"
                                ></input>
                            </div>
                            <div className="info">
                                <div className="this-will-flex">
                                    <label>Description</label>
                                    <div className="will-flex">
                                        Char Count: {description.length}
                                    </div>
                                </div>
                                <textarea
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setDescription(event.target.value)}
                                    value={description}
                                    placeholder="Description (Max Char 250)"
                                ></textarea>
                            </div>
                            <div className="info">
                                <div className="this-will-flex">
                                    <label>Instructions</label>
                                    <div className="will-flex">
                                        Char Count: {instructions.length}
                                    </div>
                                </div>
                                <textarea
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setInstructions(event.target.value)}
                                    value={instructions}
                                    placeholder="Instructions (Max Char 250)"
                                ></textarea>
                            </div>
                            <div className="info">
                                <label>Image URL (optional)</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setImageUrl(event.target.value)}
                                    value={imageUrl}
                                ></input>
                            </div>
                            <div className="info">
                                <label>Category</label>
                                <select
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setCategoryId(event.target.value)}
                                    value={categoryId}
                                >
                                    <option value='Pick a Category' >Pick A Category</option>
                                    <option type='number' value={1}>Breakfast</option>
                                    <option type='number' value={2}>Lunch</option>
                                    <option type='number' value={3}>Dinner</option>
                                    <option type='number' value={4}>Beverages</option>
                                    <option type='number' value={5}>Dessert</option>
                                    <option type='number' value={6}>Healthy</option>
                                    <option type='number' value={7}>Snack</option>
                                </select>
                            </div>
                            <div className="submit-new-recipe-container">
                                <button
                                    className="submit-new-recipe"
                                    type="submit"
                                    disabled={errorValidators.length}
                                >Edit Recipe</button>
                            </div>
                        </form>
                    </div>
                </div>

            </>

        )
    }


}
