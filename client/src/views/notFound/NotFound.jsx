import React from 'react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <main>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <section>
        <h1>Page not Fount</h1>
      </section>
    </main>
  );
};

export default NotFound;
