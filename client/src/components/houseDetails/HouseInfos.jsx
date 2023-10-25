import React from 'react';
import './HouseInfos.scss';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HouseInfos = ({ house }) => {
  return (
    <section className="house-details-container">
      <Link to={`/houseList/${house._id}`} className="link">
        <figure className="image-container">
          <img src={house.images[0]} alt={house.name} className="image" />
        </figure>
      </Link>

      {/* House details */}
      <article className="house-details">
        {/* monthly price*/}
        <h2 className="house-name">
          <Link to={`/houseList/${house._id}`} className="link">
            {house.name}
          </Link>
        </h2>

        {/* address of the house*/}
        <aside className="address-type">
          <p className="address">
            <FaMapMarkerAlt className="icon" />
            {house.address}
          </p>

          <h3 className="type">
            <Link to={`/houseList/${house._id}`} className="link">
              {house.type === 'rent' ? 'For Rent' : 'For Sale'}
            </Link>
          </h3>
        </aside>

        {/* Price = regular price - discount price */}
        {house.offer && (
          <p className="offer-paragraph">
            The cheapest price:
            <span className="regular-price">${house.regularPrice}</span>
            <span className="price-after-discount">
              ${house.regularPrice - house.discountedPrice}
            </span>
          </p>
        )}

        {/* description */}
        <p className="description">
          <span>Description - </span>
          {house.description}
        </p>

        {/* Unorder list items */}
        <ul className="unorder-list-items">
          <li className="list-item">
            <FaBed className="list-icon" />
            {house.bathRooms > 1
              ? `${house.bathRooms} beds `
              : `${house.bathRooms} bed `}
          </li>

          <li className="list-item">
            <FaBath className="list-icon" />
            {house.bathRooms > 1
              ? `${house.bathRooms} baths `
              : `${house.bathRooms} bath `}
          </li>

          <li className="list-item">
            <FaParking className="list-icon" />
            {house.parking ? 'Parking Spot' : 'No Parking'}
          </li>

          <li className="list-item">
            <FaChair className="list-icon" />
            {house.furnished ? 'Furnished' : 'Unfurnished'}
          </li>
        </ul>
      </article>
    </section>
  );
};

export default HouseInfos;
