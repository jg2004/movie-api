import axios from 'axios';
import { apiKey, movieUrl } from './config';


const movieImageElement = document.getElementById('movie-poster-img');
const movieDetailsElement = document.getElementById('movie-details');
const moviePlotElement = document.getElementById('movie-plot');
const movieId = location.hash.substring(1);

const getMovie = async (movieId) => {
  const url = `${movieUrl}?i=${movieId}&apiKey=${apiKey}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log('error occured getting movie dets', error);
  }
}

addEventListener('DOMContentLoaded', async () => {
  const movieDetails = await getMovie(movieId);
  console.log(movieDetails);
  renderMovieDetails(movieDetails);
})

function renderMovieDetails(movieDetails) {
  let rottenTomatoesRatings;
  if (movieDetails.Ratings[1]) {
    rottenTomatoesRatings = `${movieDetails.Ratings[1].Source}: ${movieDetails.Ratings[1].Value}`
  } else {
    rottenTomatoesRatings = "Rotten Tomatoes: N/A";
  }
  movieImageElement.src = movieDetails.Poster
  movieDetailsElement.innerHTML = `
<h2>${movieDetails.Title}</h2>
<ul class="list-group bg-dark">
            <li class="list-group-item bg-dark">Year: ${movieDetails.Year}</li>
            <li class="list-group-item bg-dark">Run Time: ${movieDetails.Runtime}</li>
            <li class="list-group-item bg-dark">Type: ${movieDetails.Type}</li>
            <li class="list-group-item bg-dark">Genre: ${movieDetails.Genre}</li>
            <li class="list-group-item bg-dark">Actors: ${movieDetails.Actors}</li>
            <li class="list-group-item bg-dark">Rated: ${movieDetails.Rated}</li> 
            <li class="list-group-item bg-dark">Released: ${movieDetails.Released}</li>     
            <li class="list-group-item bg-dark">IMDB Rating: ${movieDetails.imdbRating}</li>
            <li class="list-group-item bg-dark">${rottenTomatoesRatings}</li>
            <li class="list-group-item bg-dark">Box Office: ${movieDetails.BoxOffice}</li>       
            <li class="list-group-item bg-dark"><a href="${movieDetails.Website}"></a></li>             
</ul>
        `

  moviePlotElement.innerHTML = `
  <div class="card bg-dark mt-5">
  <div class="card-body">
    <h5 class="card-title">Plot</h5>
    <p class="card-text">${movieDetails.Plot}.</p>
    <a href="http://imdb.com/title/${movieDetails.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
    <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
    </div>
</div>
`

}

