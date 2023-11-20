import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllMovies,
  fetchMovies,
  selectMovieError,
  selectMovieStatus,
} from '../redux/movie/movieSlice';
import {
  fetchMoviesCategory,
  selectSearchFilter,
  updateSearchFilter,
  selectCategoryStatus,
  selectCategoryError,
} from '../redux/category/categorySlice';
import Movie from './Movie';
import Search from './Search';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const movies = useSelector(selectAllMovies);
  const searchFilter = useSelector(selectSearchFilter);
  const movieError = useSelector(selectMovieError);
  const movieStatus = useSelector(selectMovieStatus);
  const searchStatus = useSelector(selectCategoryStatus);
  const searchError = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMoviesCategory());
  }, [searchFilter, searchTerm, dispatch]);

  const handleCategory = (e) => {
    if (e.target && e.target.value) {
      const { value } = e.target;
      dispatch(updateSearchFilter(value));
      setSearchTerm('');
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const renderMoviesSection = () => (
    <>
      <div className="flex flex-col items-center sm:flex-row justify-center mx-auto">
        <div>
          <h4 className="text-xl sm:text-2xl mb-5 mr-4 font-bold">Filter Movies:</h4>
        </div>
        <div className="w-9/12 sm:w-6/12 mb-5">
          <Search filterChange={handleCategory} searchChange={handleSearch} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-3 px-3 pr-3 mb-8">
        {/* eslint-disable-next-line no-use-before-define */}
        {filteredMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            image={movie.image}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            description={movie.description}
            vote={movie.vote}
            average={movie.average}
            popularity={movie.popularity}
          />
        ))}
      </div>
    </>
  );

  let filteredMovies = movies.filter((movie) => {
    if (searchTerm === '') {
      return movie;
    }
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (filteredMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mb-96">
        <h1 className="text-center mb-2">No matching titles... </h1>
        <button type="button" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    );
  }

  if (searchStatus === 'loading' || movieStatus === 'loading') {
    return <div className="text-center">Loading...</div>;
  }

  if (searchStatus === 'failed') {
    return <div className="text-center">{searchError}</div>;
  }

  if (movieStatus === 'failed') {
    return <div className="text-center">{movieError}</div>;
  }

  return (
    <>
      {renderMoviesSection()}
    </>
  );
};

export default Movies;
