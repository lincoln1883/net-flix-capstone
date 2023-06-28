import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movie/movieSlice';
import categoryReducer from './category/categorySlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    categories: categoryReducer,
  },
});

export default store;
