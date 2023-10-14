import React from 'react';
import './Auth.scss';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { app } from '../../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth = ({ login, signup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // handle google button
  const handleGoogle = async () => {
    try {
      // Google Provider
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      // User dataq
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/users/google',
        userData
      );

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sigin with google', error);
    }
  };

  return (
    <div className="google-btn-container">
      <FcGoogle className="google-icon" />
      {/* In order to prevent submission, you need to include type button */}
      {login && (
        <button onClick={handleGoogle} type="button" className="google-btn">
          Login with Google
        </button>
      )}
      {signup && (
        <button onClick={handleGoogle} type="button" className="google-btn">
          Sign Up with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
