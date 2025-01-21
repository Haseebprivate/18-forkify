import "core-js/stable";
import "regenerator-runtime/runtime";

// mvc imports
import {
  loadRecipe,
  state,
  loadSearchRecipe,
  getPageResults,
  updateServings,
  addBookMark,
} from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async () => {
  try {
    //hash event
    const id = window.location.hash.slice(1);

    // guard cluase

    if (!id) return;
    recipeView.renderSpinner(recipeContainer);
    // loading recipe

    // update results view
    resultsView.update(getPageResults());
    await loadRecipe(id);
    let recipe = state.recipe;
    recipeView.render(recipe);
  } catch (error) {
    recipeView.handlerError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await loadSearchRecipe(query);
    console.log(state.search.results);
    resultsView.render(getPageResults());
    paginationView.render(state.search);
  } catch (error) {
    throw error;
  }
};

const paginationButtonClick = function (goto) {
  const currentPage = state.search.page;
  resultsView.render(getPageResults(+goto));
  paginationView.render(state.search);
  console.log("pagination clicked");
};

const controlServings = function (servings) {
  // update the recipe servings
  updateServings(servings);
  // update the recipe view
  console.log(state.recipe);
  recipeView.update(state.recipe);
};

const controlAddBookMark = function () {
  addBookMark(state.recipe);

  recipeView.update(state.recipe);
  console.log(state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationButtonClick);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookMark(controlAddBookMark);
  // controlServings();
};

init();
