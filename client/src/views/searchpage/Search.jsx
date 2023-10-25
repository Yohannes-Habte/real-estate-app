import React, { useEffect, useState } from 'react';
import './Search.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../../components/searchResult/SearchResult';

// Initial state
const initialState = {
  searchItem: '',
  type: 'all',
  parking: false,
  furnished: false,
  offer: false,
  sort: 'created_at',
  order: 'desc',
};
const Search = () => {
  const navigate = useNavigate();

  // Local state variables
  const [searchFormData, setSearchFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showMoreHouses, setShowMoreHoues] = useState(false);
  const [houses, setHouses] = useState([]);

  console.log(houses);

  // =============================================================================
  // Destructuring the initial states
  // =============================================================================
  const { searchItem, type, parking, furnished, offer, sort, order } =
    searchFormData;
  // =============================================================================
  // display data using useEffect hook
  // =============================================================================
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchItemFromUrl = urlParams.get('searchItem');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchItemFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchFormData({
        searchItem: searchItemFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchHouseData = async () => {
      setLoading(true);
      setShowMoreHoues(false);
      const searchQuery = urlParams.toString();
      const { data } = await axios.get(
        `http://localhost:5000/api/houses?${searchQuery}`
      );

      // Condition to show more than nine houses
      if (data.length >= 9) {
        setShowMoreHoues(true);
      } else {
        setShowMoreHoues(false);
      }
      setHouses(data);
      setLoading(false);
    };

    fetchHouseData();
  }, [window.location.search]);

  // =============================================================================
  // Handle change
  // =============================================================================
  const handleChange = (e) => {
    // handle change for the search item
    if (e.target.id === 'searchItem') {
      setSearchFormData({ ...searchFormData, searchItem: e.target.value });
    }

    // handle change for the type
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSearchFormData({ ...searchFormData, type: e.target.id });
    }

    // handle change for parking, furnished and offer
    // since we are getting parking, furnished and offer from the url, we need to apply condition to confirm "true" or "false"
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSearchFormData({
        ...searchFormData,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    // handle change for the select and its options
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSearchFormData({ ...searchFormData, sort, order });
    }
  };

  // =============================================================================
  // Handle submit
  // =============================================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchItem', searchItem);
    urlParams.set('type', type);
    urlParams.set('parking', parking);
    urlParams.set('furnished', furnished);
    urlParams.set('offer', offer);
    urlParams.set('sort', sort);
    urlParams.set('order', order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // =============================================================================
  // Show more house, which is more than 9 houses
  // =============================================================================
  const handleShowMoreHouses = async () => {
    // First find the number of houses using length
    const numberOfHouses = houses.length;
    const startIndex = numberOfHouses;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const { data } = await axios.get(
      `http://localhost:5000/api/houses?${searchQuery}`
    );

    if (data.length < 9) {
      setShowMoreHoues(false);
    }

    // Since data is an array, to add the new house data to existing house data, you need to use array rather than object
    setHouses([...houses, ...data]);
  };

  return (
    <main className="search-page">
      <section className="search-page-container">
        {/* Search item container */}
        <article className="search-item-wrapper">
          <h2 className="subTitle"> Search Items</h2>

          <form onSubmit={handleSubmit} action="" className="search-form">
            {/* Search Item */}
            <div className="input-container">
              <label htmlFor="searchItem" className="input-label">
                Search Term:
              </label>

              <input
                type="text"
                name="searchItem"
                id="searchItem"
                value={searchItem}
                onChange={handleChange}
                placeholder="Search..."
                className="input-field"
              />
            </div>

            {/*  Service type */}
            <div className="input-container">
              <label className="input-label">Services:</label>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  checked={type === 'all'}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="rent-sale"> Rent & Sale </span>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  checked={type === 'rent'}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="rent-sale"> Rent </span>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  checked={type === 'sale'}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="rent-sale"> Sale </span>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  checked={searchFormData.offer}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="rent-sale"> Offer </span>
              </div>
            </div>

            {/* Search Amenities */}
            <div className="input-container">
              <label className="input-label">Amenities:</label>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  checked={parking}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="rent-sale"> Parking </span>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  checked={furnished}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="rent-sale"> Furnished </span>
              </div>
            </div>

            {/*  Sort Results from select options by ...  */}
            <div className="input-container">
              <label className="input-label">Sort Result:</label>
              <select
                name="sort_order"
                id="sort_order"
                defaultValue={'created_at_desc'}
                onChange={handleChange}
                className="select-options"
              >
                <option value="regularPrice_desc">Price hight to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest </option>
                <option value="createdAt_asc">Olderst</option>
              </select>
            </div>

            <button className="search-button">Search</button>
          </form>
        </article>

        {/* Search item result container */}
        <article className="search-result-wrapper">
          <h1 className="title">Search Result</h1>
          {!loading && houses.length === 0 && (
            <p className="no-house-found">No House Found! </p>
          )}

          {loading && <p className="loader">Loading...</p>}
          <div className="searched-houses-result">
            {!loading &&
              houses &&
              houses.map((house) => (
                <SearchResult key={house._id} house={house} />
              ))}

            {/* Show more than nine houses */}
            {showMoreHouses && (
              <button
                type="button"
                onClick={handleShowMoreHouses}
                className="show-more-btn"
              >
                Show More
              </button>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Search;
