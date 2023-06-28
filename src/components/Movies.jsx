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
  selectAllCategories,
  selectCategoryStatus,
  selectCategoryError,
} from '../redux/category/categorySlice';
import Movie from './Movie';
import Search from './Search';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const movies = useSelector(selectAllMovies);
  const categories = useSelector(selectAllCategories);
  const searchFilter = useSelector(selectSearchFilter);
  const movieError = useSelector(selectMovieError);
  const movieStatus = useSelector(selectMovieStatus);
  const searchStatus = useSelector(selectCategoryStatus);
  const searchError = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMoviesCategory({ category: searchFilter, searchFilter: searchTerm }));
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

  const filteredMovies = categories.filter((movie) => movie
    .title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredMovies === 0) return <h1 className="text-center">No matching titles... </h1>;
  if (filteredMovies.length > 0) {
    return (
      <>
        {searchStatus === 'loading' && <div className="text-center">Loading...</div>}
        {searchStatus === 'failed' && (
        <div className="text-center">
          {searchError}
        </div>
        )}
        {searchStatus === 'succeeded' && (
        <>
          <div className="flex flex-col items-center sm:flex-row justify-center mx-auto">
            <div>
              <h4 className="text-xl sm:text-2xl mb-5 mr-4 font-bold">Filter by title:</h4>
            </div>
            <div className="w-9/12 sm:w-6/12 mb-5">
              <Search filterChange={handleCategory} searchChange={handleSearch} />
            </div>
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-3 px-3 pr-3 mb-8">
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
        )}
      </>
    );
  }

  return (
    <>
      {movieStatus === 'loading' && <div className="text-center">Loading...</div>}
      {movieStatus === 'failed' && <div className="text-center">{movieError}</div>}
      {movieStatus === 'succeeded' && (
      <>
        <div className="flex flex-col items-center sm:flex-row justify-center mx-auto">
          <div>
            <h4 className="text-xl sm:text-2xl mb-5 mr-4 font-bold">Filter by title:</h4>
          </div>
          <div className="w-9/12 sm:w-6/12 mb-5">
            <Search filterChange={handleCategory} searchChange={handleSearch} />
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-3 px-3 pr-3 mb-8">
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              image={movie.image}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              description={movie.description}
            />
          ))}
        </div>
      </>
      )}
    </>
  );
};

export default Movies;
