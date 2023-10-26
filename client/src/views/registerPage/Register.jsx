import React, { useState } from 'react';
import './Register.scss';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Auth from '../../components/google/Auth';
import { validateEmail, validatePassword } from '../../utiles/features';
import { HiOutlineEye } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import ButtonSpinner from '../../components/loader/ButtonSpinner';

// Initial State
const initialSate = {
  username: '',
  email: '',
  password: '',
  agreed: false,
};
const Register = () => {
  const navigate = useNavigate();

  // Local state variables
  const [formData, setFormData] = useState({ initialSate });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Destructuring the initial variables
  const { username, email, password, agreed } = formData;

  // Input change handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle change for the agree state variable
  const onChange = (e) => {
    if (e.target.name === 'agreed') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
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

  // Function to register the user
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email!');
    }

    if (!validatePassword(password)) {
      return toast.error(
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      );
    }

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auths/register',
        formData,
        { withCredentials: true }
      );

      // If there is errror...
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      event.target.reset();
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError(error.message);
    }
  };

  return (
    <main className="register-page">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <section className="register-container">
        <h1 className="title"> Create Account</h1>
        <fieldset className="register-field">
          {/* <legend className="register-legend"> Sign Up for Free </legend> */}
          <form onSubmit={handleSubmit} action="" className="register-form">
            {/* Username */}
            <div className="input-container">
              <FaUserAlt className="icon" />
              <input
                type="text"
                name={'username'}
                id={'username'}
                value={username}
                onChange={handleInputChange}
                placeholder="Username"
                className="input-field"
              />
              <label htmlFor={'username'} className="input-label">
                Username
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Email address */}
            <div className="input-container">
              <MdEmail className="icon" />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="input-field"
              />
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Password */}
            <div className="input-container">
              <RiLockPasswordFill className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleInputChange}
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

            <div className="register-consent">
              <input
                type="checkbox"
                name="agreed"
                id="agreed"
                checked={agreed}
                onChange={onChange}
                className="register-consent-input"
              />
              <span className="accept">I accept</span>
              <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
            </div>

            <button className="register-button">
              {loading ? <ButtonSpinner /> : 'Sign Up'}
            </button>

            <Auth signup={'signup'} />
          </form>
        </fieldset>

        <p className="haveAccount">
          Already have an account?
          <NavLink to="/login"> Log In </NavLink>
        </p>

        {error && <p className="error"> {error} </p>}
      </section>
    </main>
  );
};

export default Register;
