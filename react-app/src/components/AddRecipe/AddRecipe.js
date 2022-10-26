import { newRecipeThunk, getAllRecipesThunk } from "../../store/recipe";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import "./AddRecipe.css"

export default function AddRecipe() {
    const user = useSelector(state => state.session.user);
    const userId = user.id;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [errorValidators, setErrorValidators] = useState([])

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        const errors = []

        if (!name) errors.push("Please name your recipe")
        if (!description) errors.push("Describe your recipe")
        if (!instructions) errors.push("Please provide instructions")
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

        await dispatch(newRecipeThunk(name, description, instructions, imageUrl, userId, category)).then(() => dispatch(getAllRecipesThunk()));

        history.push(`/`)
    }

    return (
        <div className="recipe-form-container">
            {errorValidators.length > 0 && (
                <ul>
                    {errorValidators.map((error) => (
                        <li className="add-recipe-error" key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <form
                onSubmit={handleSubmit}
                className='add-recipe'
            >
                <div>
                    <label>Name of Recipe</label>
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={event => setName(event.target.value)}
                        value={name}
                    ></input>
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={event => setDescription(event.target.value)}
                        value={description}
                    ></input>
                </div>
                <div>
                    <label>Instruction</label>
                    <textarea
                        type="text"
                        autoComplete="off"
                        onChange={event => setInstructions(event.target.value)}
                        value={instructions}
                    ></textarea>
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={event => setImageUrl(event.target.value)}
                        value={imageUrl}
                    ></input>
                </div>
                <div>
                    <label>Category</label>
                    <select
                        type="text"
                        autoComplete="off"
                        onChange={event => setCategory(event.target.value)}
                        value={category}
                    >
                        <option>Pick a Category</option>
                        <option value="1">Breakfast</option>
                        <option value="2">Lunch</option>
                        <option value="3">Dinner</option>
                        <option value="4">Beverages</option>
                        <option value="5">Dessert</option>
                        <option value="6">Healthy</option>
                        <option value="7">Snack</option>
                    </select>
                    {/* <input
                        type="text"
                        autoComplete="off"
                        onChange={event => setCategory(event.target.value)}
                        value={category}
                    ></input> */}
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={errorValidators.length}
                    >Add Recipe</button>
                </div>
            </form>
        </div>
    )
}