import { API_URL } from "./config";
import { getJSON } from "./helpers";
import { RESULTS_PER_Page } from "./config";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_Page,
  },
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchRecipe = async function (search) {
  try {
    state.search.query = search;
    const data = await getJSON(`${API_URL}?search=${search}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPageResults = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = (numberOfServings) => {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * numberOfServings) / state.recipe.servings;
  });

  state.recipe.servings = numberOfServings;
};

export const addBookMark = (recipe) => {
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id)
    state.recipe.bookMarked = state.recipe.bookMarked ? false : true;
};
