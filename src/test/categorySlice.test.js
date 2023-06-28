// category.slice.test.js

import { configureStore } from '@reduxjs/toolkit';
import reducer from '../redux/category/categorySlice';

describe('category slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        category: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    const initialState = {
      movies: [],
      status: 'idle',
      error: null,
      searchFilter: '',
    };

    const state = store.getState().category;
    expect(state).toEqual(initialState);
  });
});
