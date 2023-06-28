import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMovies, fetchMovies } from '../redux/movie/movieSlice';
import {
  fetchMoviesCategory,
  selectSearchFilter,
  updateSearchFilter,
  selectAllCategories,
} from '../redux/category/categorySlice';
import Movie from './Movie';
import Search from './Search';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const movies = useSelector(selectAllMovies);
  const categories = useSelector(selectAllCategories);
  const searchFilter = useSelector(selectSearchFilter);

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
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredMovies = categories.filter((movie) => movie
    .title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredMovies.length > 0) {
    return (
      <>
        <div className="w-11/12 sm:w-9/12 mx-auto mb-5">
          <Search filterChange={handleCategory} searchChange={handleSearch} />
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-3 px-3 pr-3">
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
  }

  return (
    <>
      <div className="w-9/12 mx-auto mb-5">
        <Search filterChange={handleCategory} searchChange={handleSearch} />
      </div>
      <div className="grid grid-cols-3 gap-3 px-3 pr-3">
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
  );
};

export default Movies;
