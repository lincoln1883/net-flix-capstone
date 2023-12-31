import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Movie = ({
  id,
  title,
  image,
  rating,
  year,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/movies/${id}`);
  };
  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
        onClick={handleNavigate}
        onKeyDown={handleNavigate}
        role="button"
        tabIndex={0}
      >
        <img className="w-full" src={image} alt={title} />
        <div className="flex flex-col gap-1 px-2 py-3 sm:gap-3 sm:px-6 sm:py-4">
          <h3 className="font-bold text-lg sm:text-xl mb-2 text-ellipsis">
            Title:
            {title}
          </h3>
          <h5 className="text-gray-700 text-base">
            Released year:
            {year}
          </h5>
          <p className="text-gray-700 text-base">
            Rating:
            {rating}
          </p>
        </div>
      </div>
    </>
  );
};

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.number,
  year: PropTypes.string,
};
Movie.defaultProps = {
  id: 0,
  image: '',
  title: '',
  rating: 0,
  year: '',
};

export default Movie;
