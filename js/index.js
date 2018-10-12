import elements from './views/movieSearchElements';
import * as searchView from './views/searchView';
import { MovieSearch } from './models/MovieSearch';

let currentPage;
let state = {};

elements.nextButton.addEventListener('click', async () => {

  currentPage++;
  searchView.enablePrevious();
  if (currentPage >= state.movieSearch.totalPages) {
    searchView.disableNext();
  }
  try {
    await state.movieSearch.getMovies(currentPage);
    renderMovies();
  } catch (error) {
    init()
    searchView.displayErrorMessage(error);
    console.log('error fetching movie', error)
  }
})

elements.prevButton.addEventListener('click', async () => {
  currentPage--;
  searchView.enableNext();
  if (currentPage <= 1) {
    searchView.disablePrevious();
  }
  try {
    await state.movieSearch.getMovies(currentPage);
    renderMovies();
  } catch (error) {
    init()
    searchView.displayErrorMessage(error);
    console.log('error fetching movie', error)
  }
})

elements.searchForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  init();
  const searchTerm = searchText.value.trim();
  state.movieSearch = new MovieSearch(searchTerm);
  try {
    if (searchTerm) {
      await state.movieSearch.getMovies();
      if (state.movieSearch.totalPages > 1 && currentPage !== state.movieSearch.totalPages) {
        searchView.enableNext()
      }
      searchView.renderTitle(currentPage, state.movieSearch.totalPages);
      searchView.renderMovies(state.movieSearch.movieArray);
    } else {
      searchText.value = ''
    }

  } catch (error) {
    init()
    searchView.displayErrorMessage(error);
    console.log('error fetching movie', error)
  }
})

window.addEventListener('DOMContentLoaded', (e) => {
  init()
})

function init() {
  currentPage = 1;
  searchView.init();
  if (state.movieSearch) state.movieSearch.init();
}

function renderMovies() {
  searchView.renderMovies(state.movieSearch.movieArray)
  searchView.renderTitle(currentPage, state.movieSearch.totalPages);
}