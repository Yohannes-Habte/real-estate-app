import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../redux/user/userSlice';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  // Find logged in user using useSelector from the react redux
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [searchItem, setSearchItem] = useState('');
  const [open, setOpen] = useState(false);

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // URLSearchParams is used to display the url based on the search item (searchItem)
    const urlParams = new URLSearchParams(window.location.search);
    // set the urlparams based on the searchItem
    urlParams.set('searchItem', searchItem);
    // since some of the searchItems are numbers, you need to conver them in string
    const searchQuery = urlParams.toString();

    // Finally, you need to apply useNavigation hook to navigate based on the user search
    navigate(`/search?${searchQuery}`);
  };

  //! If you want to display on the search bar what you write on url, you need to apply useEffect hook
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchItem(searchTermFromUrl);
    }
  }, [window.location.search]);

  // Delete user account
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/delete/${currentUser._id}`
      );

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Delete user account
  const handleLogout = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(
        `http://localhost:5000/api/auths/logout`
      );

      if (data.success === false) {
        dispatch(userLogoutFailure(data.message));
      }
      dispatch(userLogoutSuccess(data));
    } catch (error) {
      dispatch(userLogoutFailure(error.message));
    }
  };

  // Active NavLink styling
  const activeLink = ({ isActive }) => (isActive ? `active` : 'passive');

  return (
    <header className="header">
      <NavLink to={'/'}>
        <h1 className="logo">LisaEstate</h1>
      </NavLink>

      {/* Search bar form */}
      <form onSubmit={handleSubmit} action="" className="search">
        <div className="input-container">
          <input
            type="text"
            name="searchItem"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search..."
            className="input-field"
          />
          <span className="input-highlight"></span>
        </div>

        <button className="search-btn">
          <FaSearch className="search-icon" />
        </button>
      </form>

      {/* Navigation items */}
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
            <img
              onClick={() => setOpen(!open)}
              className="image"
              src={currentUser.image}
              alt={'Profile'}
            />
            {open && (
              <ul className="user-account">
                <li onClick={handleLogout} className="logout">
                  Log out
                </li>

                <li onClick={handleDeleteAccount} className="delete">
                  Delete Account
                </li>
              </ul>
            )}
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
