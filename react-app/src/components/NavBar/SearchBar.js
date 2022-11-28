import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getAllRecipesThunk } from "../../store/recipe";
import { login } from "../../store/session";
import './SearchBar.css';

export function SearchBar() {
    const [search, setSearch] = useState('');
    const [recipeResults, setRecipeResults] = useState(true);

    const dispatch = useDispatch()

    let allRecipesArr;
    let filteredRecipes;

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch, search])

    const allRecipes = useSelector(state => state.recipe);

    allRecipesArr = Object.values(allRecipes);

    if (allRecipesArr?.length > 0) {
        filteredRecipes = allRecipesArr?.filter(values => values.name?.toLowerCase().includes(search.toLowerCase()))
    } else {
        filteredRecipes = "";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <>
            <div id="search">
                <i id="spy" class="fa-solid fa-magnifying-glass"></i>
                <input
                    id="search-bar"
                    placeholder={"What would you like to cook?" || search}
                    onChange={handleSubmit}
                    value={search}
                ></input>
            </div>
            <div className={search?.length ? "SearchBarContainer" : "HiddenResult"}>
                <button
                    className="toggleResultsSearch"
                    onClick={() => {
                        setRecipeResults(!recipeResults);
                    }}
                >
                    {recipeResults == true ? (
                        <div>Hide Recipe Results</div>
                    ) : (
                        <div>Show Recipe Results</div>
                    )}
                </button>
                <div
                    className={
                        filteredRecipes?.length &&
                            search?.length &&
                            recipeResults == true
                            ? "Filteredrecipes-container"
                            : "HiddenResult"
                    }
                >
                    {/* search return map */}
                    <div className="FilteredreturnContainer">
                        {filteredRecipes &&
                            filteredRecipes?.map((recipe) => {
                                return (
                                    <div
                                        className="SearchRecipeMappedContainer"
                                        key={recipe.id}
                                        onClick={() => setSearch("")}
                                    >
                                        <Link to={`/recipe/${recipe.id}`}>
                                            <img
                                                className="SearchRecipeIndividual"
                                                src={recipe.imageUrl}
                                                alt="preview"
                                            />
                                        </Link>
                                        <Link
                                            className="SearchRecipeNavLinkTitle"
                                            to={`/recipe/${recipe.id}`}
                                        >
                                            {recipe.name}
                                        </Link>
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </div>
            <div
                className={
                    !filteredRecipes?.length &&
                        search !== "" &&
                        recipeResults == true
                        ? "errorHandlingSearchContainer"
                        : "HiddenResult"
                }
            >
                <div className="errorhandlingSearchmessage">No Images Found</div>
            </div>
        </>

    )
}
