import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utiles/features';

const Login = () => {
  const navigate = useNavigate();

  // global state variables
  const [loading, setLoading] = useState(false);

  // Local State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update input data
  const updateDat = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function that display and hide the fonfirm password
  const displayConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Reset all state variables for the login form
  const resetVariables = () => {
    setEmail('');
    setPassword('');
  };

  // Submit logged in user Function
  const submitLoginUser = async (event) => {
    event.preventDefault();

    if (!email) {
      return toast.error('Please fill in the email fields!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email!');
    }

    if (!validatePassword(password)) {
      return toast.error(
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      );
    }

    try {
      // The body
      const loginUser = {
        email: email,
        password: password,
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        loginUser,
        { withCredentials: true }
      );

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="lagin-page">
      {/* {isLoading && <EntirePageLoader />}  */}
      <h1 className="login-title"> Welcome To Your Account </h1>
      <div className="login-container">
        <figure className="login-icon-container">
          <FaUserAlt className="login-icon" />
        </figure>
        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitLoginUser} className="login-form">
            <div className="input-container">
              <MdEmail className="icon" />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={updateDat}
                placeholder="Enter Email"
                className="input-field"
              />
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <RiLockPasswordFill className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={updateDat}
                //onBlur={checkPasswordFormat}
                placeholder="Enter Password"
                className="input-field"
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <span className="input-highlight"></span>
              <span onClick={displayPassword} className="password-display">
                {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
              </span>
            </div>
            <div className="login-checkbox-forget-password">
              <div className="login-checkbox-keep-signed-in">
                <input
                  type="checkbox"
                  name="login"
                  className="login-checkbox"
                />
                <span>Keep me signed in</span>
              </div>
              <div className="forget-password">
                <a href=""> Forget your password? </a>
              </div>
            </div>

            <button
              // onClick={handleClick}
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'loading' : 'Login'}
            </button>

            <p className="haveNoAccount">
              Don not have an account? <NavLink to="/register">Sign Up</NavLink>
            </p>
          </form>
        </fieldset>
      </div>
    </main>
  );
};

export default Login;
