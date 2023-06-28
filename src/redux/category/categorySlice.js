import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const APIKEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
  searchFilter: '',
};

export const fetchMoviesCategory = createAsyncThunk('movies/fetchMoviesCategory', async (params) => {
  const { category, searchFilter } = params;
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${category}&include_adult=false&language=en-US&page=1&api_key=${APIKEY}`,
  );
  const moviesItem = response.data.results;
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

  return moviesList.filter((movie) => movie
    .title.toLowerCase().includes(searchFilter.toLowerCase()));
});

const categorySlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateSearchFilter(state, action) {
      state.searchFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesCategory.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchMoviesCategory.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.movies = action.payload;
    });
    builder.addCase(fetchMoviesCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { updateSearchFilter } = categorySlice.actions;
export const selectCategoryStatus = (state) => state.movies.status;
export const selectAllCategories = (state) => state.movies.movies;
export const selectCategoryError = (state) => state.movies.error;
export const selectSearchFilter = (state) => state.movies.searchFilter;

export default categorySlice.reducer;
