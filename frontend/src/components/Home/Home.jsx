import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import './home.css';

function Home() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const [sortedSpots, setSortedSpots] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

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

  const toggleDescription = (spotId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [spotId]: !prev[spotId]
    }));
  };

  return (
    <div className="home-container">
      <h1>Middle Earth Stays</h1>
      {Object.keys(sortedSpots).map((region) => (
        <div key={region} className="region">
          <h2>{region}</h2>
          <div className="spots-container">
            {sortedSpots[region].map((spot) => (
              <div key={spot.id} className="spot">
                <img src={spot.previewImage} alt={spot.name} />
                <h3>{spot.name}</h3>
                <p className="description">
                  {expandedDescriptions[spot.id] ? spot.description : spot.description.slice(0, 100)} 
                  {spot.description.length > 100 && (
                    <button onClick={() => toggleDescription(spot.id)}>
                      {expandedDescriptions[spot.id] ? 'Less' : 'More'}
                    </button>
                  )}
                </p>
                <p>Price: ${spot.price} per night</p>
                <p>Rating: {spot.avgRating}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
