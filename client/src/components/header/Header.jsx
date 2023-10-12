import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <NavLink to={'/'}>
        {' '}
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
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={'/about'}>About</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={'/contact'}> Contact</NavLink>
        </li>
        <li className="list-item">
          <NavLink to={'/login'}>Log In </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
