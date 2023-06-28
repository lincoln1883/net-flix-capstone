import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllMovies } from '../redux/movie/movieSlice';

const MovieDetail = () => {
  const { id } = useParams();
  const movie = useSelector(selectAllMovies).find((movie) => movie.id === Number(id));

  if (!movie) return <h1 className="text-center">Movie no longer available...</h1>;

  return (
    <div className="flex items-center mx-auto mb-9 w-4/5 rounded shadow-xl h-screen bg-white">
      <div className="flex flex-col sm:flex-row md:flex-row h-5/6 justify-evenly items-center">
        <img className="px-4 w-auto h-52 sm:w-full sm:h-full" src={movie.image} alt={movie.title} />
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-bold mt-1 px-5 text-xl text-center sm:text-start">
            {movie.title}
          </h3>
          <div className="flex flex-wrap justify-evenly sm:gap-2 px-5 gap-0 mb-2 mt-2">
            <span className="px-1 pr-1">
              Released Year:
              {movie.year}
            </span>
            <span className="px-1 pr-1">
              Overall Rating:
              {movie.rating}
            </span>
            <span className="px-1 pr-1">
              votes:
              {movie.vote}
            </span>
            <span className="px-1 pr-1">
              Average votes:
              {movie.average}
            </span>
            <span className="px-1 pr-1">
              Popularity:
              {movie.popularity}
            </span>
          </div>
          <p className="font-serif px-5 pb-2 text-base md:text-lg">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
