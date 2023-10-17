import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  // Find logged in user using useSelector from the react redux
  const { currentUser } = useSelector((state) => state.user);
  // Active NavLink styling
  const activeLink = ({ isActive }) => (isActive ? `active` : 'passive');
  return (
    <header className="header">
      <NavLink to={'/'}>
        <h1 className="logo">LisaEstate</h1>
      </NavLink>
      <form action="" className="search">
        <div className="input-container">
          <input
            type="text"
            name=""
            placeholder="Search..."
            className="input-field"
          />
          <span className="input-highlight"></span>
        </div>
        <FaSearch className="search-icon" />
      </form>

      <ul className="list-items">
        <li className="list-item">
          <NavLink to={'/'} className={activeLink}>
            Home
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={'/about'} className={activeLink}>
            About
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to={'/contact'} className={activeLink}>
            Contact
          </NavLink>
        </li>
        {currentUser ? (
          <figure className="image-container">
            <img className="image" src={currentUser.image} alt={'Profile'} />
          </figure>
        ) : (
          <li className="list-item">
            <NavLink to={'/profile'} className={activeLink}>
              Sign In
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
