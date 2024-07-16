import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import './home.css';

function Home() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const [sortedSpots, setSortedSpots] = useState({});

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  useEffect(() => {
    if (spots.length > 0) {
      const regions = spots.reduce((acc, spot) => {
        const region = spot.state;
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push(spot);
        return acc;
      }, {});

      setSortedSpots(regions);
    }
  }, [spots]);

  return (
    <div className="home-container">
      <h1>Middle Earth Stays</h1>
      {Object.keys(sortedSpots).map((region) => (
        <div key={region} className="region">
          <h2>{region}</h2>
          <div className="spots-container">
            {sortedSpots[region].map((spot) => (
              <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-link">
                <div className="spot">
                  <img src={spot.previewImage} alt={spot.name} />
                  <h3>{spot.name}</h3>
                  <p>{spot.city}, {spot.state}</p>
                  <p>${spot.price} per night</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
