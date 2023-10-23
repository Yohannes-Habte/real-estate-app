import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.scss';

const Contact = ({ houseList }) => {
  // Local state variables
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  // Handle change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Display user info using useEffect hook
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${houseList.userRef}`
        );

        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [houseList.userRef]);
  return (
    <>
      {landlord && (
        <article className="contact-wrapper">
          <h3 className="subTitle">
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">
              {houseList.name.toLowerCase()}
            </span>
          </h3>
          <textarea
            name="message"
            id="message"
            cols="30" rows="10"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="text-message"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${houseList.name}&body=${message}`}
            className="contact-link"
          >
            Send Message
          </Link>
        </article>
      )}
    </>
  );
};

export default Contact;
