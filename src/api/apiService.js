const { default: Axios } = require('axios');

const api_key = 'd3b4e2b6590fadf64c27140207cd1cc0';
const axiosInstance = Axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
});

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchTrendingMovies(setPage) {
    try {
      const data = await axiosInstance
        .get(`trending/movie/day?api_key=${api_key}`)
        .then(response => response.data);

      setPage(data.page, data.total_pages);

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieByID(id) {
    try {
      const movie = await axiosInstance
        .get(`movie/${id}?api_key=${api_key}`)
        .then(response => response.data);

      return movie;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovies(fetchMovies, setPage) {
    try {
      const [movies, genres] = await Promise.all([
        fetchMovies(setPage),
        this.fetchGenre(),
      ]);
      const moviesData = this.renderGenres(genres, movies);

      return moviesData;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMoviesByKeyWord(setPage) {
    try {
      const data = await axiosInstance
        .get(
          `search/movie?api_key=${api_key}&query=${this.searchQuery}&page=${this.page}`,
        )
        .then(response => response.data);

      setPage(data.page, data.total_pages);

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchGenre() {
    try {
      const data = await axiosInstance
        .get(`genre/movie/list?api_key=${api_key}`)
        .then(response => response.data);

      return data.genres;
    } catch (error) {
      console.log(error);
    }
  }

  renderGenres(genres, movies) {
    return movies.map(({ genre_ids, ...otherProps }) => {
      const genre_names = genre_ids.map(genreId => {
        const { name } = genres.find(({ id }) => id === genreId);
        return name;
      });

      return { ...otherProps, genre_names };
    });
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
