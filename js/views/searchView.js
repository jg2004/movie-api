import elements from './movieSearchElements';
import emptyImageUrl from '/assets/img/no-image-icon-15.png';

const init = () => {
  elements.pageButtons.classList.add('d-none');
  elements.errorMessage.classList.add('d-none');
  elements.movieResults.innerHTML = '';
  elements.prevButton.disabled = true;
  elements.nextButton.disabled = true;
}

const disableNext = () => {
  elements.nextButton.disabled = true;
}
const enableNext = () => {
  elements.nextButton.disabled = false;
}

const disablePrevious = () => {
  elements.prevButton.disabled = true;
}

const enablePrevious = () => {
  elements.prevButton.disabled = false;

}

const renderTitle = (currentPage, totalPages) => {
  elements.pageButtons.classList.remove('d-none');
  elements.pageTitle.textContent = `Page ${currentPage} of ${totalPages}`
}

const renderMovies = (movies) => {

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
  elements.movieResults.innerHTML = output;
}

const displayErrorMessage = (error) => {
  elements.errorMessage.classList.remove('d-none');
  elements.errorMessage.textContent = error;
}
export { init, renderTitle, renderMovies, displayErrorMessage, enableNext, enablePrevious, disableNext, disablePrevious }