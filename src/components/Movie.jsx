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
        <img className="w-full" src={image} alt={title} title={title} />
        <div className="flex flex-col gap-3 px-6 py-4">
          <h3 className="font-bold text-xl mb-2">
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.number,
  year: PropTypes.string,
};
Movie.defaultProps = {
  title: '',
  image: '',
  rating: 0,
  year: 0,
};

export default Movie;
