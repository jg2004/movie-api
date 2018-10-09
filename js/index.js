import axios from 'axios';
import { movieUrl, apiKey } from './config'
import emptyImageUrl from '../assets/img/no-image-icon-15.png';

const searchForm = document.getElementById('searchForm');
const searchText = document.getElementById('searchText');
const movieResults = document.getElementById('movies');
const pageButtons = document.getElementById('page-buttons');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageTitle = document.getElementById('page-title');
const errorMessage = document.getElementById('error-message');

let currentPage;
let totalResults;
let searchTerm;
let totalPages;


nextButton.addEventListener('click', () => {
  currentPage++;
  console.log(currentPage, totalPages)
  if (currentPage >= totalPages) {
    nextButton.disabled = true;
  }
  getMovies()
  if (currentPage !== 1) {
    prevButton.disabled = false;
  }
})

prevButton.addEventListener('click', () => {
  currentPage--;
  if (currentPage <= 1) {
    prevButton.disabled = true
  }
  getMovies()
})

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  init();
  searchTerm = searchText.value.trim();
  if (searchTerm) {
    getMovies();
  } else{
    searchText.value=''
  }
})

async function getMovies() {
  const url = `${movieUrl}?s=${searchTerm}&page=${currentPage}&apiKey=${apiKey}`;
  try {
    const res = await axios.get(url);
    if (res.data.Response === "False") {
      //display error message
      throw new Error(res.data.Error)
    }
    const movieArray = res.data.Search;
    totalResults = res.data.totalResults;
    totalPages = totalResults / 10;
    console.log(res)
    let fractPages = totalPages - Math.trunc(totalPages);
    if (fractPages > 0) {
      totalPages++;
      totalPages = Math.trunc(totalPages);
    }
    if (totalPages > 1 && currentPage !== totalPages) {
      nextButton.disabled = false;
    }
    renderTitle();
    renderMovies(movieArray);

  } catch (error) {
    console.log('error fetching movie', error)
    displayErrorMessage(error);
    return
  }
}

function displayErrorMessage(error) {
  init();
  errorMessage.classList.remove('d-none');
  errorMessage.textContent = error;
}

function renderTitle() {
  pageButtons.classList.remove('d-none');
  pageTitle.textContent = `Page ${currentPage} of ${totalPages}`
}


function renderMovies(movies) {

  let movieUrl;
  let output = '';

  movies.forEach((movie) => {

    movieUrl = movie.Poster === "N/A" ? emptyImageUrl : movie.Poster
    output +=
      `
    <div class= "col-md-3"> 
    <div class=" card bg-custom text-white text-center">
    <img  class='card-img' src="${movieUrl}">
    <div class='card-body'>    
    <h5 class='card-text'>${movie.Title}</h5>
    <a href='movie.html#${movie.imdbID}' class='btn btn-primary'>Movie Details</a>
     </div>
    </div>
    </div>
    `
  });

  movieResults.innerHTML = output;
}

window.addEventListener('DOMContentLoaded', (e) => {
  init()
})

function init() {
  pageButtons.classList.add('d-none');
  errorMessage.classList.add('d-none');
  movieResults.innerHTML = '';
  prevButton.disabled = true;
  nextButton.disabled = true;
  currentPage = 1;
  totalPages = 0;
  totalResults = 0;
}