import { newRecipeThunk, getAllRecipesThunk } from "../../store/recipe";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";

import "./AddRecipe.css"

export default function AddRecipe() {
    const user = useSelector(state => state.session.user);
    const userId = user?.id;
    const username = user?.username
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [errorValidators, setErrorValidators] = useState([])

    const dispatch = useDispatch()
    const history = useHistory();

    const categories = { 1: "Breakfast", 2: "Lunch", 3: "Dinner", 4: "Beverages", 5: "Dessert", 6: "Healthy", 7: "Snack" }

    useEffect(() => {
        const errors = []

        if (!name) errors.push("Please name your recipe")
        if (name.length > 25) errors.push("Recipe cannot exceed 25 characters")

        if (!description) errors.push("Describe your recipe")
        if (description.length > 500) errors.push("Description cannot exceed 500 characters")

        if (!instructions) errors.push("Please provide instructions")
        if (instructions.length > 500) errors.push("Instructions cannot exceed 500 characters")

        if (!category) errors.push("Please select a category")

        setErrorValidators(errors)

    }, [name, description, instructions, category])

    if (!user) {
        alert("You must be signed in to add a recipe")
        return <Redirect to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errorValidators.length > 0) {
            return alert("There was something wrong with your recipe")
        }

        await dispatch(newRecipeThunk(name, description, instructions, imageUrl, userId, username, category)).then(() => dispatch(getAllRecipesThunk()));

        history.push(`/category/${categories[category]}/${category}`)
    }


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
                            <div className="add-your-recipe">Add Your Recipe!</div>
                            <div className="info">
                                <label>Name of Recipe</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setName(event.target.value)}
                                    value={name}
                                ></input>
                            </div>
                            <div className="info">
                                <label>Description</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setDescription(event.target.value)}
                                    value={description}
                                ></input>
                            </div>
                            <div className="info">
                                <label>Instruction</label>
                                <textarea
                                    type="text"
                                    autoComplete="off"
                                    onChange={event => setInstructions(event.target.value)}
                                    value={instructions}
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
                                    onChange={event => setCategory(event.target.value)}
                                    value={category}
                                >
                                    <option value={null}>Pick a Category</option>
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
                                >Add Recipe</button>
                            </div>
                        </form>
                    </div>
                </div>

            </>

        )
    }

}
