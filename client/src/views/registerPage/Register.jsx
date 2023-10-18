import React, { useState } from 'react';
import './Register.scss';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utiles/features';
import Auth from '../../components/google/Auth';
import { useDispatch, useSelector } from 'react-redux';

// Initial State
const initialSate = {
  username: '',
  email: '',
  password: '',
};
const Register = () => {
  const navigate = useNavigate();

  // global state variables from React Redux
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialSate);

  // Distructure form data
  const { username, email, password } = formData;

  // Input change handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [agree, setAgree] = useState(false);
  const [agreeChanged, setAgreeChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function that display and hide the fonfirm password
  const displayConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Function to reset all the state variables
  const reset = () => {
    setAgree(false);
    setAgreeChanged(false);
  };

  // Function to register the user
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      return toast.error('Please fill in all fields!');
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
      const userData = {
        username: username,
        email: email,
        password: password,
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
        userData,
        { withCredentials: true }
      );

      navigate('/login');
      reset();
      return toast.success(
        `${username}, you have successfuly created an account!`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="register-page">
      <section className="register-container">
        <h1 className="title"> Create Account</h1>
        <fieldset className="register-field">
          {/* <legend className="register-legend"> Sign Up for Free </legend> */}
          <form onSubmit={handleSubmit} action="" className="register-form">
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                required
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

            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="email"
                name={'email'}
                id={'email'}
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input-field"
              />
              <label htmlFor={'email'} className="input-label">
                Email Address
              </label>
              <span className="input-highlight"></span>
            </div>

            <div className="input-container">
              <RiLockPasswordFill className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name={'password'}
                id={'password'}
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
                className="input-field"
              />
              <label htmlFor={'password'} className="input-label">
                Password
              </label>
              <span className="input-highlight"></span>
              <span onClick={displayPassword} className="password-display">
                {showPassword ? (
                  <AiFillEyeInvisible className="icon" />
                ) : (
                  <AiFillEye className="icon" />
                )}
              </span>
            </div>

            <div className="register-consent">
              <input
                type="checkbox"
                name="agree"
                className="register-consent-input"
              />
              <span className="accept">I accept</span>
              <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
            </div>

            <button className="register-button">
              {loading ? 'loading' : 'Sign Up'}
            </button>

            <Auth signup={'signup'} />
          </form>
        </fieldset>

        <p className="haveAccount">
          Already have an account?
          <NavLink to="/login"> Log In </NavLink>
        </p>
      </section>
    </main>
  );
};

export default Register;
