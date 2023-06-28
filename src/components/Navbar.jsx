import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const title = (id) => {
    if (location.pathname === '/') {
      return 'Movies';
    } if (location.pathname === `/movies/${id}`) {
      return 'Movie Details';
    }
    return 'Movie Details';
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className="flex justify-around items-center mt-10 mb-10">
      <div className="flex items-center mt hover:cursor-pointer w-20 text-center">
        <AiOutlineLeft className="sm:w-10 h-10" onClick={goBack} />
        {location.pathname !== '/' ? <span>Back</span> : ''}
      </div>
      <div className="flex justify-center">
        <p className="text-2xl">{title()}</p>
      </div>
      <div className="flex justify-between sm:gap-5 w-16 sm:w-20">
        <BiMicrophone className="sm:w-10 h-10" />
        <BsGear className="sm:w-10 h-10" />
      </div>
    </nav>
  );
};

export default Navbar;
