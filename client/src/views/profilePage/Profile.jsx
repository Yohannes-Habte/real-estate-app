import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillSwitcher } from 'react-icons/ai';
import { useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../redux/user/userSlice';
import { HiOutlineEye } from 'react-icons/hi';

const Profile = () => {
  const navigate = useNavigate();
  // Find logged in user using useSelector from the react redux
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Initial State
  const initialSate = {
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: currentUser?.password || '',
    image: currentUser?.image || 'https://i.ibb.co/4pDNDk1/avatar.png',
  };
  // Local state variables
  const [profileData, setProfileData] = useState(initialSate);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imagePercentageUpLoad, setImagePercentageUpLoad] = useState(0);
  const [imageUpLoadError, setImageUpLoadError] = useState(false);
  const [houses, setHouses] = useState([]);
  const [showHousesError, setShowHousesError] = useState(false);
  const [success, setSuccess] = useState(false);

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

  // This function upload image using firebase
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

    try {
      dispatch(updateUserStart());

      const { data } = await axios.put(
        `http://localhost:5000/api/users/update/${currentUser._id}`,
        profileData,
        { withCredentials: true }
      );
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }
      dispatch(updateUserSuccess(data));
      setSuccess(true);
      event.target.reset();
      // navigate('/');
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  // Delete user account
  const handleDelete = async () => {
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

  // Show all houses created by a particular user
  const handleShowHouses = async () => {
    try {
      setShowHousesError(false);
      const { data } = await axios.get(
        `http://localhost:5000/api/users/user/${currentUser._id}/houses`
      );
      setHouses(data);
    } catch (error) {
      setShowHousesError(true);
    }
  };

  // Show all houses created by a particular user
  const handleHouseDelete = async (houseId) => {
    try {
      setShowHousesError(false);
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/houses/delete/${houseId}`
      );
      // if the delete is successful, update the houses data
      setHouses((houseData) =>
        houseData.filter((house) => house._id !== houseId)
      );
    } catch (error) {
      setShowHousesError(true);
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

          {/* Email Address */}
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

          <button disabled={loading} className="update-button">
            {loading ? 'loading' : 'Update'}
          </button>

          {/* Create house or houses */}
          <article className="creating-houses">
            <h2 className="subTitle">Creating New House/s</h2>
            <p className="paragraph">
              To create a new house or houses, you need to click on the Create
              Houses button at the bottom.
            </p>
            <Link to={'/houses'} className={'create-house-link'}>
              Create Houses
            </Link>
          </article>

          {/* List of created houses */}
          <article className="list-of-created-houses">
            <h2 className="subTitle"> List of Available Houses</h2>

            <button
              type="button"
              onClick={handleShowHouses}
              className="show-house-btn"
            >
              Show Houses
            </button>
            {houses &&
              houses.length > 0 &&
              houses.map((house) => {
                return (
                  <section className="house-desplay-wrapper">
                    <figure className="house-image-container">
                      <Link to={`/houses/${house._id}`}>
                        <img
                          className="house-image"
                          src={house.images[0]}
                          alt=""
                        />
                      </Link>
                    </figure>
                    <Link to={`/houses/${house._id}`}>
                      <h3 className="subTitle"> {house.name} </h3>
                    </Link>
                    <button className="edit-btn">Edit</button>
                    <button
                      type="button"
                      onClick={() => handleHouseDelete(house._id)}
                      className="delte-btn"
                    >
                      Delete
                    </button>
                  </section>
                );
              })}
            {showHousesError && <p> {showHousesError} </p>}
          </article>
        </form>

        {/* Delete and Log out */}
        <div className="account-management">
          <span onClick={handleDelete} className="delete">
            Delete Account
          </span>
          <span onClick={handleLogout} className="sign-out">
            Sign Out
          </span>
        </div>
        <p className="error"> {error && error} </p>
        <p className="success">
          {success && 'User data is updated successfully!'}{' '}
        </p>
      </section>
    </main>
  );
};

export default Profile;
