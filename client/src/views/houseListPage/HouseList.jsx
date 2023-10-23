import React, { useEffect, useState } from 'react';
import './HouseList.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//& Step 1: import Swiper JS and Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules'; // This is used to navigate to different images
import 'swiper/css';
import 'swiper/css/navigation';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../../components/contact/Contact';

const HouseList = () => {
  //& Step 2: Initialize the SwiperCore as follows
  SwiperCore.use([Navigation]);

  // Get house ID using useParams
  const params = useParams();
  const houseId = params.id;

  // Local state variables
  const [houseList, setHouseList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // Display house information on the brower using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/houses/house/${houseId}`
        );
        setHouseList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [houseId]);

  return (
    <main className="list-house-page">
      {loading && <p> Loading... </p>}

      {error && <p> {error} </p>}

      {houseList && !error && !loading && (
        <section className="list-house-container">
          {/* Swiper */}
          <Swiper navigation>
            {houseList.images.map((url) => (
              <SwiperSlide key={url}>
                <figure className="image-container">
                  <img className="image" src={url} alt="House" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Title of the page */}
          <h1 className="title">{houseList.name} </h1>

          {/* Copy Link */}
          <div className="share">
            <FaShare
              className="share-icon"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && <p className="copy-paragraph">Link copied!</p>}

          {/* Container of house list details */}
          <article className="house-list-details-wraper">
            {/* sub title and price*/}
            <h2 className="subTitle">
              {houseList.name} discount price is $
              {houseList.offer && houseList.discountedPrice}
              {houseList.type === 'rent' && ' per month'}
            </h2>

            {/* address of the house*/}
            <p className="address">
              <FaMapMarkerAlt className="icon" />
              {houseList.address}
            </p>

            {/* Price = regular price - discount price */}
            <article className="house-type-price">
              <h3 className="subTitle">
                {houseList.type === 'rent' ? 'For Rent' : 'For Sale'}
              </h3>
              {houseList.offer && (
                <p className="offer-paragraph">
                  The discounted customer price:
                  <span className="regular-price">
                    ${houseList.regularPrice}
                  </span>
                  <span className="price-after-discount">
                    ${houseList.regularPrice - houseList.discountedPrice} OFF
                  </span>
                </p>
              )}
            </article>

            {/* description */}
            <p className="paragraph">
              <span>Description - </span>
              {houseList.description}
            </p>

            {/* Unorder list items */}
            <ul className="unorder-list-items">
              <li className="list-item">
                <FaBed className="icon" />
                {houseList.bathRooms > 1
                  ? `${houseList.bathRooms} beds `
                  : `${houseList.bathRooms} bed `}
              </li>

              <li className="list-item">
                <FaBath className="icon" />
                {houseList.bathRooms > 1
                  ? `${houseList.bathRooms} baths `
                  : `${houseList.bathRooms} bath `}
              </li>

              <li className="list-item">
                <FaParking className="icon" />
                {houseList.parking ? 'Parking Spot' : 'No Parking'}
              </li>

              <li className="list-item">
                <FaChair className="icon" />
                {houseList.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {/* Current logged in user and contact */}

            {currentUser && (
                <button
                  className="house-list-btn"
                  onClick={() => setContact(true)}
                >
                  Contact landlord
                </button>
              )}

            {contact && <Contact houseList={houseList} />}
          </article>
        </section>
      )}
    </main>
  );
};

export default HouseList;
