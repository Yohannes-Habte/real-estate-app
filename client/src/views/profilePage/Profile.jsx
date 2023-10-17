import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utiles/features';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';

// Initial State
const initialSate = {
  username: '',
  email: '',
  password: '',
};
const Profile = () => {
  const navigate = useNavigate();
  // Find logged in user using useSelector from the react redux
  const { currentUser } = useSelector((state) => state.user);

  // Local state variables
  const [profileData, setProfileData] = useState(initialSate);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imagePercentageUpLoad, setImagePercentageUpLoad] = useState(0);
  const [imageUpLoadError, setImageUpLoadError] = useState(false);

  // useRef for the user photo
  const fileRef = useRef(null);

  // Distructure form data
  const { username, email, password } = profileData;

  // To display the profile image selected
  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentageUpLoad(Math.round(progress));
      },
      (error) => {
        setImageUpLoadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setProfileData({ ...profileData, image: downloadURL })
        );
      }
    );
  };

  // Input change handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
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
      const updateUserData = {
        username: username,
        email: email,
        password: password,
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/users/profile',
        updateUserData,
        { withCredentials: true }
      );

      event.target.reset();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // firebase storage
  /**
      allow read;
      allow write: if
      request.resource.size < 2 * 2024 * 2024 && 
      request.resource.contentType.matches("image/.*")
   */

  return (
    <main className="profile-page">
      <section className="profile-container">
        <h1 className="profile-title">Profile</h1>

        <figure className="image-container">
          <img
            onClick={() => fileRef.current.click()}
            className="image"
            src={profileData.image || currentUser.image}
            alt="Profile"
          />
          <p className="image-upload">
            {imageUpLoadError ? (
              <span className="image-upload-error"> Error image upload </span>
            ) : imagePercentageUpLoad > 0 && imagePercentageUpLoad < 100 ? (
              <span className="percentage-upload">
                {imagePercentageUpLoad}%
              </span>
            ) : imagePercentageUpLoad === 100 ? (
              <span className="successful-upload">Successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>
        </figure>

        <form onSubmit={handleSubmit} action="" className="profile-form">
          {/* Image input */}
          <div className="file-input-container">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="file-field"
            />
          </div>

          {/* Non Image inputs */}
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

          <button className="register-button">
            {loading ? 'loading' : 'Update'}
          </button>
        </form>
        <button>Create Listing</button>
        <div className="account-management">
          <span className="delete">Delete Account</span>
          <span className="sign-out">Sign Out</span>
        </div>

        <button> Show Listings</button>
      </section>
    </main>
  );
};

export default Profile;
