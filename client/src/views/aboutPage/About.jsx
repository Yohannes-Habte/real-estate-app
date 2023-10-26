import React from 'react';
import './About.scss';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <main className="about-page">
      <Helmet>
        <title>About</title>
      </Helmet>
      <section className="about-page-container">
        <h1 className="about-title">About Lisa Estate</h1>
        <p className="about-us">
          Welcome to Lisa ESTATE, the business system for mediation in the sale
          and rent of houses. On our website you can find the entire offer of
          the most exclusive real estate on the Adriatic and, in addition to the
          regular offer of real estate that you can find on our portal, for
          investors we offer capital investments, projects, marinas, hotels,
          which we will deliver to you upon your specific request.
        </p>
      </section>
    </main>
  );
};

export default About;
