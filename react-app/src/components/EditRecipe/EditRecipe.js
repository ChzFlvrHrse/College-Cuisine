import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { getOneRecipeThunk, updateRecipeThunk } from "../../store/recipe";
import "../AddRecipe/AddRecipe.css"

export default function EditRecipe() {
    const { recipeId } = useParams();

    const currRecipe = useSelector(state => state.recipe);
    const user = useSelector(state => state.session.user);

    const userId = user.id;
    const username = user.username

    const [name, setName] = useState(currRecipe.name);
    const [description, setDescription] = useState(currRecipe.description);
    const [instructions, setInstructions] = useState(currRecipe.instructions);
    const [imageUrl, setImageUrl] = useState(currRecipe.imageUrl);
    const [categoryId, setCategoryId] = useState(currRecipe.categoryId);
    const [errorValidators, setErrorValidators] = useState([])

    useEffect(() => {
        const errors = []

        if (!name) errors.push("Please name your recipe")
        if (!description) errors.push("Describe your recipe")
        if (!instructions) errors.push("Please provide instructions")
        if (!categoryId) errors.push("Please select a category")

        setErrorValidators(errors)

    }, [name, description, instructions, categoryId])

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOneRecipeThunk(recipeId))
        // setName(name);
        // setDescription(description);
        // setInstructions(instructions);
        // setImageUrl(imageUrl);
        // setCategoryId(categoryId)
    }, []);

    const categories = { 1: "Breakfast", 2: "Lunch", 3: "Dinner", 4: "Beverages", 5: "Dessert", 6: "Healthy", 7: "Snack" }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errorValidators.length > 0) {
            return alert("There was something wrong with your recipe")
        }

        await dispatch(updateRecipeThunk(name, description, instructions, imageUrl, userId, username, categoryId, recipeId)).then(() => dispatch(getOneRecipeThunk(recipeId)));

        history.push(`/recipe/${recipeId}`)
    }

    console.log(categoryId)

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
                    <div className="add-your-recipe">Edit Your Recipe!</div>
                    <div className="info">
                        <label>Name of Recipe</label>
                        <input
                            type="text"
                            autoComplete="off"
                            onChange={event => setName(event.target.value)}
                            value={name}
                            placeholder={currRecipe.name}
                        ></input>
                    </div>
                    <div className="info">
                        <label>Description</label>
                        <input
                            type="text"
                            autoComplete="off"
                            onChange={event => setDescription(event.target.value)}
                            value={description}
                            placeholder={currRecipe.description}
                        ></input>
                    </div>
                    <div className="info">
                        <label>Instruction</label>
                        <textarea
                            type="text"
                            autoComplete="off"
                            onChange={event => setInstructions(event.target.value)}
                            value={instructions}
                            placeholder={currRecipe.instructions}
                        ></textarea>
                    </div>
                    <div className="info">
                        <label>Image URL (optional)</label>
                        <input
                            type="text"
                            autoComplete="off"
                            onChange={event => setImageUrl(event.target.value)}
                            value={imageUrl}
                            placeholder={currRecipe.imageUrl}
                        ></input>
                    </div>
                    <div className="info">
                        <label>Category</label>
                        <select
                            type="text"
                            autoComplete="off"
                            onChange={event => setCategoryId(event.target.value)}
                            value={categoryId}
                            name="hello"
                        >
                            <option value={null} disabled selected>Pick A Category</option>
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
