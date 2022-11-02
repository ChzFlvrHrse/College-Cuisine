const NEW_INGREDIENT = "review/newiNGREDIENT"
const UPDATE_INGREDIENT = "review/update"
const DELETE_INGREDIENT = "review/delete"

const newIngredient = (ingredient) => {
    return {
        type: NEW_INGREDIENT,
        ingredient
    }
}

const updateReview = (updated) => {
    return {
        type: UPDATE_INGREDIENT,
        updated
    }
}

const deleteReview = (ingredientId) => {
    return {
        type: DELETE_INGREDIENT,
        ingredientId
    }
}

export const newIngredientThunk = (ingredient, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/ingredient/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ingredient})
    });
    if (response.ok) {
      const createIngredient = await response.json();
      dispatch(newIngredient(createIngredient))
      return createIngredient;
    }
};

export const updateIngredientThunk = (ingredient, recipeId, ingredientId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/ingredient/${ingredientId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ingredient}),
    });
    if (response.ok) {
      const updateIngredient = await response.json();
      dispatch(updateReview(updateIngredient));
    }
};

export const deleteIngredientThunk = (recipeId, ingredientId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/ingredient/${ingredientId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteReview(recipeId))
    }
}

const initialState = {}
const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_INGREDIENT: {
            const newState = {...state}
            newState[action.ingredient.id] = action.review
            return newState
        }
        case UPDATE_INGREDIENT: {
            const newState = {...state}
            newState[action.updated.id] = action.updated
            return newState
        }
        case DELETE_INGREDIENT: {
            const newState = {}
            return newState
        }
        default:
            return state
    }
}

export default ingredientReducer
