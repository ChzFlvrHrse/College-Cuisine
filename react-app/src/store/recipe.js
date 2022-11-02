const GET_RECIPES = "recipe/getRecipes"
const GET_ONE_RECIPE = "recipe/getOneRecipe"
const NEW_RECIPE = "recipe/newRecipe"
const UPDATE_RECIPE = "recipe/update"
const DELETE_RECIPE = "recipe/delete"

const getAllRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        recipes
    }
}

const getOneRecipe = (recipeId) => {
    return {
        type: GET_ONE_RECIPE,
        recipeId
    }
}

const newRecipe = (recipe) => {
    return {
        type: NEW_RECIPE,
        recipe
    }
}

const updateRecipe = (updated) => {
    return {
        type: UPDATE_RECIPE,
        updated
    }
}

const deleteRecipe = (recipeId) => {
    return {
        type: DELETE_RECIPE,
        recipeId
    }
}

export const getAllRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipe/");

    if (response.ok) {
        const recipes = await response.json();
        dispatch(getAllRecipes(recipes));
        return recipes;
    }
}

export const getOneRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}`)

    if (response.ok) {
        const recipe = await response.json();
        dispatch(getOneRecipe(recipe));
        return recipe
    }
}

export const newRecipeThunk = (name, description, instructions, imageUrl, userId, username, categoryId) => async (dispatch) => {
    const response = await fetch("/api/recipe/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, description, instructions, imageUrl, userId, username, categoryId})
    });
    if (response.ok) {
      const createRecipe = await response.json();
      dispatch(newRecipe(createRecipe))
      return createRecipe;
    }
};

export const updateRecipeThunk = (name, description, instructions, imageUrl, userId, username, categoryId, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, description, instructions, imageUrl, userId, username, categoryId}),
    });
    if (response.ok) {
      const updatedRecipe = await response.json();
      dispatch(updateRecipe(updatedRecipe));
    }
};

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteRecipe(recipeId))
    }
}

const initialState = {}
const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES: {
            const newState = {};
            action.recipes.recipes.forEach(recipe => {
                newState[recipe.id] = recipe;
            })
            return newState
        }
        case GET_ONE_RECIPE: {
             const newState = {...action.recipeId};
             return newState;
        }
        case NEW_RECIPE: {
            const newState = {...state}
            newState[action.recipe.id] = action.recipe
            return newState
        }
        case UPDATE_RECIPE: {
            const newState = {...state}
            newState[action.updated.id] = action.updated
            return newState
        }
        case DELETE_RECIPE: {
            const newState = {}
            return newState
        }
        default:
            return state
    }
}

export default recipeReducer
