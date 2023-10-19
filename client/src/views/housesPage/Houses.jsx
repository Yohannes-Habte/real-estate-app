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

const Houses = () => {
    const [file, setFile] = useState(0)
    const files = () => {
        setFile(file.length + 1)
    }
  return (
    <main className="houses-page">
      <section className="houses-container">
        <h1 className="houses-title">Create a House</h1>

        <form action="" className="form">
          {/* All inputs except checkbox inputs  */}
          <div className="wrapper-except-checkbox">
            {/* Name */}
            <div className="input-container">
              <FaHouseUser className="input-icon" />
              <input
                type="text"
                required
                name={'name'}
                id={'name'}
                placeholder="House Name"
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
                placeholder="Regular Price Per Month"
                className="input-field"
              />

              <label htmlFor={'regularPrice'} className="input-label">
                Regular Price Per Month
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Descounted Price */}
            <div className="input-container">
              <MdPriceChange className="input-icon" />
              <input
                type="number"
                required
                name={'discountedPrice'}
                id={'discountedPrice'}
                placeholder="Discounted Price Per Month"
                className="input-field"
              />

              <label htmlFor={'discountedPrice'} className="input-label">
                Discounted Price Per Month
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
                placeholder="Description"
                className="input-field"
              />

              <label htmlFor={'description'} className="input-label">
                Description
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Image input  */}
            <div className="file-container">
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                name="photos"
                id="photos"
                className="image-field"
              />
              <label htmlFor="photos" className="file-label">
                <FaCloudUploadAlt className="label-icon" />
                <span className="upload-images">Upload maximum 6 photos.</span>
                <span className="uploaded-images">Choose files to upload.</span>
              </label>
            </div>
          </div>

          {/* Checkbox container */}
          <div className="check-input-container">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="check-box"
              />
              <span className="label">Sell</span>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="check-box"
              />
              <span className="label">Rent</span>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="check-box"
              />
              <span className="label">Parking</span>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="check-box"
              />
              <span className="label">Furnished</span>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="check-box"
              />
              <span className="label">Offer</span>
            </div>
          </div>

          <button className='upload-btn'>Upload</button>
          <button className='listing-btn'> Create Listing </button>
        </form>
      </section>
    </main>
  );
};

export default Houses;
