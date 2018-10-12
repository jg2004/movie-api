import { apiKey, movieUrl } from '../config';
import axios from 'axios';

export class MovieSearch {

  constructor(searchTerm) {
    this.searchTerm = searchTerm;
    this.totalResults = 0;
    this.totalPages = 1;
    this.movieArray = [];
  }

  async  getMovies(currentPage) {
    const url = `${movieUrl}?s=${this.searchTerm}&page=${currentPage}&apiKey=${apiKey}`;
    const res = await axios.get(url);
    if (res.data.Response === "False") {
      //display error message
      throw new Error(res.data.Error)
    }
    this.movieArray = res.data.Search;
    this.totalResults = res.data.totalResults;
    this.totalPages = this.totalResults / 10;
    console.log(res)
    let fractPages = this.totalPages - Math.trunc(this.totalPages);
    if (fractPages > 0) {
      this.totalPages++;
      this.totalPages = Math.trunc(this.totalPages);
    }
  }

  init() {
    this.totalPages = 0;
    this.totalResults = 0;
  }
}