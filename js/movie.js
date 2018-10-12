import * as movieDetailsView from './views/movieDetailsElements'
import { Movie } from './models/Movie';

const movieId = location.hash.substring(1);

addEventListener('DOMContentLoaded', async () => {
  const movie = new Movie(movieId);

  try {
    await movie.getMovieDetails()
    console.log(movie.movieDetails);
    movieDetailsView.renderMovieDetails(movie.movieDetails);
  } catch (error) {
    console.log('error getting movie details', error)
  }
})



