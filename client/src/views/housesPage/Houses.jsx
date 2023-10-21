import React, { useState } from 'react';
import './Houses.scss';
import {
  FaAddressCard,
  FaBed,
  FaCloudUploadAlt,
  FaHouseUser,
} from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { MdBathroom, MdPriceChange } from 'react-icons/md';
import { app } from '../../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Initial values for the hours form data
const initialState = {
  name: '',
  description: '',
  address: '',
  type: 'rent',
  regularPrice: '',
  discountedPrice: '',
  bathRooms: '',
  bedRooms: '',
  furnished: false,
  parking: false,
  offer: false,
  images: [],
};
const Houses = () => {
  // Navigate to ...
  const navigate = useNavigate();

  // global state variables from React Redux
  const { currentUser } = useSelector((state) => state.user);
  console.log('The logged in user is', currentUser._id);

  // Local state variables
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formEroor, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  console.log(formData);

  //==============================================================================
  // Handle upload photos
  //==============================================================================
  const handleImagesSubmit = (e) => {
    if (files.length > 0 && files.length + formData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  //==============================================================================
  // Store image
  //==============================================================================
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  //==============================================================================
  // Handle remove photo
  //==============================================================================
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  //==============================================================================
  // Handle change
  //==============================================================================
  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  //==============================================================================
  // Display discount price input
  //==============================================================================

  const discountPrice = (e) => {
    setDisplay(e.target.checked);
  };

  //==============================================================================
  // Handle submit
  //==============================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setFormError('You must upload at least one image');

      if (formData.regularPrice < +formData.discountedPrice)
        return setFormError('Discount price must be lower than regular price');

      setLoading(true);
      setFormError(false);

      // New house data
      const newData = {
        ...formData,
        userRef: currentUser._id,
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/houses/create',
        newData,
        { withCredentials: true }
      );
      setLoading(false);

      navigate(`/houses/${data._id}`);
    } catch (error) {
      setFormError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="houses-page">
      <section className="houses-container">
        <h1 className="houses-title">Create a House</h1>

        <form onSubmit={handleSubmit} action="" className="form">
          {/* Input container for images */}
          <article className="house-image-details">
            <h2 className="subTitle">First Upload the Photos of the House</h2>
            <div className="image-wrapper">
              {/* Image input  */}
              <div className="file-container">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  name="images"
                  id="images"
                  onChange={(e) => setFiles(e.target.files)}
                  className="image-field"
                />
                <label htmlFor="images" className="file-label">
                  <FaCloudUploadAlt className="label-icon" />

                  {formData.images.length > 0 && formData.images.length ? (
                    <span className="uploaded-images">
                      {formData.images.length} images has been selected
                    </span>
                  ) : (
                    <span className="uploaded-images">
                      Upload maximum 6 photos
                    </span>
                  )}
                </label>
              </div>

              {/* Image upload button */}
              <button
                type="button"
                disabled={uploading}
                onClick={handleImagesSubmit}
                className="button-upload"
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </button>
            </div>
          </article>

          {/* Input container for name, bedrooms, bathrooms, regular price, description and address */}
          <article className="house-details">
            <h2 className="subTitle">Fill in all details</h2>
            <div className="wrapper-house-detail-inputs">
              {/* Name */}
              <div className="input-container">
                <FaHouseUser className="input-icon" />
                <input
                  type="text"
                  required
                  name={'name'}
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Name"
                  className="input-field"
                />

                <label htmlFor={'name'} className="input-label">
                  House Name
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Bedrooms */}
              <div className="input-container">
                <FaBed className="input-icon" />
                <input
                  type="number"
                  required
                  name={'bedRooms'}
                  id={'bedRooms'}
                  onChange={handleChange}
                  value={formData.bedRooms}
                  placeholder="Number of Bedrooms"
                  className="input-field"
                />

                <label htmlFor={'bedRooms'} className="input-label">
                  Number of BedRooms
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Bathrooms */}
              <div className="input-container">
                <MdBathroom className="input-icon" />
                <input
                  type="number"
                  required
                  name={'bathRooms'}
                  id={'bathRooms'}
                  onChange={handleChange}
                  value={formData.bathRooms}
                  placeholder="Number of Bathrooms"
                  className="input-field"
                />

                <label htmlFor={'bathRooms'} className="input-label">
                  Number of Bathrooms
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Regular Price */}
              <div className="input-container">
                <MdPriceChange className="input-icon" />
                <input
                  type="number"
                  required
                  name={'regularPrice'}
                  id={'regularPrice'}
                  min={'150'}
                  max={'20000000'}
                  onChange={handleChange}
                  value={formData.regularPrice}
                  placeholder="Regular Price Per Month"
                  className="input-field"
                />

                <label htmlFor={'regularPrice'} className="input-label">
                  Regular Price Per Month
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Address  */}
              <div className="input-container">
                <FaAddressCard className="input-icon" />
                <input
                  type="text"
                  required
                  name={'address'}
                  id={'address'}
                  onChange={handleChange}
                  value={formData.address}
                  placeholder="Address"
                  className="input-field"
                />

                <label htmlFor={'address'} className="input-label">
                  Address
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Description  */}
              <div className="input-container">
                <FiFileText className="input-icon" />
                <textarea
                  type="text"
                  required
                  name={'description'}
                  id={'description'}
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Description"
                  className="input-field"
                />

                <label htmlFor={'description'} className="input-label">
                  Description
                </label>
                <span className="input-highlight"></span>
              </div>
            </div>
          </article>

          {/* Checkboxes */}
          <article className="house-checkout-details">
            <h2 className="subTitle">Check the box that describes the house</h2>
            {/* Checkboxes container */}
            <div className="check-input-container">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                  className="check-box"
                />
                <span className="label">Sell</span>
              </div>

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                  className="check-box"
                />
                <span className="label">Rent</span>
              </div>

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                  className="check-box"
                />
                <span className="label">Parking</span>
              </div>

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                  className="check-box"
                />
                <span className="label">Furnished</span>
              </div>

              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                  className="check-box"
                />
                <span className="label">Offer</span>
              </div>
            </div>
          </article>

          {/* Input conatiner for descounted Price */}

          <article className="house-discountedPrice-details">
            <h2 className="subTitle">Click on the offer to get the discount</h2>
            <div className="input-container">
              <MdPriceChange className="input-icon" />
              <input
                type="number"
                required
                min={'0'}
                max={'9000000'}
                name={'discountedPrice'}
                id={'discountedPrice'}
                onChange={handleChange}
                value={formData.discountedPrice}
                placeholder="Discounted Price Per Month"
                className="input-field"
              />

              <label htmlFor={'discountedPrice'} className="input-label">
                Discounted Price Per Month
              </label>
              <span className="input-highlight"></span>
            </div>
          </article>

          {/* Button */}
          <button
            disabled={loading || uploading}
            className="button-house-details"
          >
            {loading ? 'Loading...' : 'Send House Details'}
          </button>

          {formEroor && <p className="upload-image-error">{formEroor}</p>}
        </form>

        {/* Display uploaded images on the browser */}
        <article className="display-uploaded-images">
          <h2 className="subTitle">Check Selected Images Before Submission</h2>

          <div className="uploaded-images">
            {formData.images.length > 0 &&
              formData.images.length < 7 &&
              formData.images.map((image, index) => {
                return (
                  <figure key={image} className="uploaded-image">
                    <img className="image" src={image} alt="" />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="delete-btn"
                    >
                      X
                    </button>
                  </figure>
                );
              })}
          </div>
        </article>

        {imageUploadError && (
          <p className="upload-image-error">{imageUploadError}</p>
        )}
      </section>
    </main>
  );
};

export default Houses;
