import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SingleHouse = () => {
  // Global fetich data function
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/houses'
        );
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="single-house-page">
      {data.map((house) => {
        return (
          <section key={house._id} className="single-house-container">
            <h1 className="title"> {house.name} </h1>
          </section>
        );
      })}
    </main>
  );
};

export default SingleHouse;
