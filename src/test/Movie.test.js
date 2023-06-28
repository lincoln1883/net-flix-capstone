import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../redux/movie/movieSlice';

describe('movies slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: movieReducer,
      },
    });
  });

  it('should return the initial state', () => {
    const initialState = {
      movies: [],
      status: 'idle',
      error: null,
    };

    const state = store.getState().movies;
    expect(state).toEqual(initialState);
  });
});
