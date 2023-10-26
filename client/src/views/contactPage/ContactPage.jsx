import React, { useState } from 'react';
import './ContactPage.scss';
import { MdEmail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { BiSolidMessageDetail } from 'react-icons/bi';
import axios from 'axios';
import { formContactData } from '../../data/Data';
import { Helmet } from 'react-helmet-async';
import ButtonSpinner from '../../components/loader/ButtonSpinner';

// Initial State
const initialSate = {
  name: '',
  email: '',
  message: '',
};

const ContactPage = () => {
  // Local state variable
  const [testimonies, setTestimonies] = useState(initialSate);
  const [loading, setLoading] = useState(false);
  // Distructure the initial values
  const { name, email, message } = testimonies;

  // Function that handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonies({ ...testimonies, [name]: value });
  };

  // Submit user testimonial or comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:5000/api/comments/new-comment',
        testimonies,
        { withCredentials: true }
      );

      // Reset
      e.target.reset();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <section className="contact-page-container">
        <h1 className="contact-title">We Would Love to Hear From You</h1>
        <div className="form-communication-tools">
          <article className="form-container">
            <h3 className="sub-title"> Drop us a message below </h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="user-data">
                <div className="input-container">
                  <FaUserAlt className="input-icon" />
                  <input
                    type="text"
                    required
                    name={'name'}
                    id={'name'}
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Enter Full Name"
                    className="input-field"
                  />

                  <label htmlFor={'name'} className="input-label">
                    Full Name
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
              </div>

              <div className="text-message-container">
                <BiSolidMessageDetail className="input-icon" />
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={handleInputChange}
                  rows="7"
                  placeholder="We value your message"
                  className="text-area-input-field"
                />

                <label htmlFor={'message'} className="input-label">
                  Text Message
                </label>
                <span className="input-highlight"></span>
              </div>
              <button className="contact-form-btn">
                {loading ? <ButtonSpinner /> : 'Submit'}{' '}
              </button>
            </form>
          </article>

          <article className="fast-contact-tools">
            <h5 className="sub-title"> Would you like a prompt reply? </h5>

            {formContactData.map(({ icon, link }, index) => {
              return (
                <div key={index} className="contact-tools">
                  <p className="contact-icon"> {icon} </p>
                  <p className="link-container"> {link} </p>
                </div>
              );
            })}
          </article>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
