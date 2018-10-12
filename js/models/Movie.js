import axios from 'axios';
import { apiKey, movieUrl } from '../config';

export class Movie {

  constructor(movieId) {
    this.movieId = movieId
  }

  async  getMovieDetails() {
    const url = `${movieUrl}?i=${movieId}&apiKey=${apiKey}`;
    const res = await axios.get(url);
    this.movieDetails = res.data;
  }

}