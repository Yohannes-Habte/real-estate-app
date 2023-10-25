import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import HouseInfos from '../../components/houseDetails/HouseInfos';

const Home = () => {
  SwiperCore.use([Navigation]);

  // Local state variables
  const [offerHouses, setOfferHouses] = useState([]);
  const [saleHouses, setSaleHouses] = useState([]);
  const [rentHouses, setRentHouses] = useState([]);
  console.log(rentHouses);

  // Display the offered houses, houses for rent and houses for sale respectively on the browser using useEffect
  useEffect(() => {
    // Fetch houses with offer
    const fetchOfferHouses = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/houses?offer=true&limit=3'
        );
        setOfferHouses(data);

        // After the houses with offere are fetched (fetchOfferHouses), then fetch houses for rent (fetchRentHouses)
        fetchRentHouses();
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch houses for rent
    const fetchRentHouses = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/houses?type=rent&limit=3'
        );

        setRentHouses(data);

        // After the houses for rent are fetched (fetchRentHouses), then fetch houses for sale (fetchSaleHouses)
        fetchSaleHouses();
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch houses for sale
    const fetchSaleHouses = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/houses?type=sale&limit=3'
        );
        setSaleHouses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferHouses();
  }, []);

  return (
    <main className="home-page">
      <section className="home-page-container">
        <h1 className="home-title">
          Find the house that perfectly fits your dream
        </h1>
        <p className="home-paragraph">
          Are you looking for a new house but are not sure where to start?
          Finding the perfect place can be quite overwhelming, but it is not
          imporssible. With some research and planning, you will soon be able to
          find a great home or house that fits your lifestyle perfectly. Whether
          you are searching for an urban or a suburan single or family house, in
          this guide we will provide all of the information and tips necessary
          to make finding your dream home or house an easyy process. Read on and
          get ready - you are about to find your dream flat by
          <Link to={'/search'} className="link">
            {' '}
            Clicking Here ➽
          </Link>
        </p>

        {/* Offered Houses Swiper */}
        <div className="swiper-wrapper">
          <Swiper navigation>
            {offerHouses &&
              offerHouses.length > 0 &&
              offerHouses.map((house) => (
                <SwiperSlide>
                  <figure key={house._id} className="image-container">
                    <img
                      className="image"
                      src={house.images[0]}
                      alt={house.name}
                    />
                  </figure>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/*  Houses for rent */}
        {rentHouses && rentHouses.length > 0 && (
          <article className="box-wrapper">
            <h2 className="subTitle"> Houses with Offer</h2>
            <Link className="link" to={'/search?offer=true'}>
              Show more houses with offer
            </Link>

            <div className="houses-wrapper">
              {offerHouses.map((house) => (
                <HouseInfos house={house} key={house._id} />
              ))}
            </div>
          </article>
        )}

        {/*  Houses for rent */}
        {rentHouses && rentHouses.length > 0 && (
          <article className="box-wrapper">
            <h2 className="subTitle">Recent Houses for Rent</h2>
            <Link className="link" to={'/search?type=rent'}>
              Show more houses for rent
            </Link>

            <div className="houses-wrapper">
              {rentHouses.map((house) => (
                <HouseInfos house={house} key={house._id} />
              ))}
            </div>
          </article>
        )}

        {/* Houses for sale */}
        {saleHouses && saleHouses.length > 0 && (
          <article className="box-wrapper">
            <h2 className="subTitle">Recent houses for Sale</h2>
            <Link className="link" to={'/search?type=sale'}>
              Show more houses for sale
            </Link>

            <div className="houses-wrapper">
              {saleHouses.map((house) => (
                <HouseInfos house={house} key={house._id} />
              ))}
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default Home;
