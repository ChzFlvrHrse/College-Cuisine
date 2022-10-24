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

export const getRecipesThunk = () => async (dispatch) => {
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
        const recipe = await response.jason();
        dispatch(getOneRecipe(recipe));
        return recipe
    }
}

export const newRecipeThunk = (name, description, instruction, imageUrl, userId, categoryId) => async (dispatch) => {
    const response = await fetch("/api/recipe/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, description, instruction, imageUrl, userId, categoryId})
    });
    if (response.ok) {
      const createRecipe = await response.json();
      dispatch(newImage(createRecipe))
      return createRecipe;
    }
};

export const updateRecipeThunk = (name, description, instruction, imageUrl, userId, categoryId, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, description, instruction, imageUrl, userId, categoryId}),
    });
    if (response.ok) {
      const updatedRecipe = await response.json();
      dispatch(updateRecipe(updatedRecipe));
    }
};

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}`)

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteRecipe(deleted))
    }
}
