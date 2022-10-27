// const GET_RECIPES = "recipe/getRecipes"
// const GET_ONE_RECIPE = "recipe/getOneRecipe"
const NEW_REVIEW = "review/newReview"
const UPDATE_REVIEW = "review/update"
const DELETE_REVIEW = "review/delete"

// const getAllRecipes = (recipes) => {
//     return {
//         type: GET_RECIPES,
//         recipes
//     }
// }

// const getOneRecipe = (recipeId) => {
//     return {
//         type: GET_ONE_RECIPE,
//         recipeId
//     }
// }

const newReview = (review) => {
    return {
        type: NEW_REVIEW,
        review
    }
}

const updateReview = (updated) => {
    return {
        type: UPDATE_REVIEW,
        updated
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

// export const getAllRecipesThunk = () => async (dispatch) => {
//     const response = await fetch("/api/recipe/");

//     if (response.ok) {
//         const recipes = await response.json();
//         dispatch(getAllRecipes(recipes));
//         return recipes;
//     }
// }

// export const getOneRecipeThunk = (recipeId) => async (dispatch) => {
//     const response = await fetch(`/api/recipe/${recipeId}`)

//     if (response.ok) {
//         const recipe = await response.json();
//         dispatch(getOneRecipe(recipe));
//         return recipe
//     }
// }

export const newReviewThunk = (review, rating, userId, username, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/review/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({review, rating, userId, username, recipeId})
    });
    if (response.ok) {
      const createReview = await response.json();
      dispatch(newReview(createReview))
      return createReview;
    }
};

export const updateReviewThunk = (review, rating, userId, username, recipeId, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/review/${reviewId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({review, rating, userId, username, recipeId}),
    });
    if (response.ok) {
      const updatedReview = await response.json();
      dispatch(updateReview(updatedReview));
    }
};

export const deleteReviewThunk = (recipeId, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/recipe/${recipeId}/review/${reviewId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteReview(deleted))
    }
}

const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_REVIEW: {
            const newState = {...state}
            newState[action.review.id] = action.review
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = {...state}
            newState[action.updated.id] = action.updated
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
