import React from 'react';
import './SearchResult.scss';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const SearchResult = ({ house }) => {
  return (
    <section className="searched-house-result">
      <Link to={`/houseList/${house._id}`} className="house-link">
        <figure className="image-container">
          <img className="image" src={house.images[0]} alt={house.name} />
        </figure>
        <h2 className="subTitle"> {house.name} </h2>

        <div className="address">
          <MdLocationOn className="address-icon" />{' '}
          <p className="paragraph">{house.address} </p>{' '}
        </div>
        <p className="paragraph"> {house.description} </p>
        <p className="price">
          $<strong> {house.regularPrice - house.discountedPrice} </strong> per
          month
        </p>
        <p className="bed-bath-rooms">
          {house.bedRooms > 1 ? (
            <span className="bed-bath">{house.bedRooms} beds </span>
          ) : (
            <span className="bed-bath">{house.bedRooms} bed </span>
          )}

          {house.bathRooms > 1 ? (
            <span className="bed-bath">{house.bedRooms} Baths </span>
          ) : (
            <span className="bed-bath">{house.bedRooms} Bath </span>
          )}
        </p>
      </Link>
    </section>
  );
};

export default SearchResult;
