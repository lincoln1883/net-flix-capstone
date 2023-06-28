import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const APIKEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios
    .get(`${BASE_URL}/movie/popular?api_key=${APIKEY}&language=en-US&page=1`);
  return response.data.results;
});

export const fetchOneMovie = createAsyncThunk('movies/fetchOneMovie', async (id) => {
  const response = await axios
    .get(`${BASE_URL}/movie/${id}?api_key=${APIKEY}&language=en-US`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const moviesItem = action.payload;
      const moviesList = moviesItem.map((movie) => ({
        id: movie.id,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        rating: movie.vote_average,
        year: movie.release_date,
        description: movie.overview,
        vote: movie.vote_count,
        average: movie.vote_average,
        popularity: movie.popularity,
      }));
      state.movies = moviesList;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchOneMovie.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchOneMovie.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const movie = action.payload;
      state.movies = {
        id: movie.id,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        rating: movie.vote_average,
        year: movie.release_date,
        description: movie.overview,
        vote: movie.vote_count,
        average: movie.vote_average,
        popularity: movie.popularity,
      };
    });
    builder.addCase(fetchOneMovie.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const selectMovieById = (state, movieId) => state.movies.movies
  .find((movie) => movie.id === movieId);

export const selectAllMovies = (state) => state.movies.movies;
export const selectMovieStatus = (state) => state.movies.status;
export const selectMovieError = (state) => state.movies.error;

export default movieSlice.reducer;
