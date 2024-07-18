import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import './home.css';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5c518',
    color: '#1b1b1b',
    maxWidth: 'none',
    width: '100%',
    fontSize: '1rem',
    borderRadius: '4px',
    padding: '8px',
    textAlign: 'center',
    marginTop: '-8px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f5c518',
  },
}));

function Home() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const [sortedSpots, setSortedSpots] = useState({});

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  useEffect(() => {
    if (spots.length > 0) {
      // Sort spots by newest to oldest
      const sortedSpots = [...spots].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const regions = sortedSpots.reduce((acc, spot) => {
        const region = spot.state;
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push(spot);
        return acc;
      }, {});

      // Sort regions by the date of the most recent spot
      const sortedRegions = Object.keys(regions).sort((a, b) => {
        const latestSpotA = new Date(regions[a][0].createdAt);
        const latestSpotB = new Date(regions[b][0].createdAt);
        return latestSpotB - latestSpotA;
      });

      // Create a sorted object based on the sorted region keys
      const sortedRegionsObj = sortedRegions.reduce((acc, region) => {
        acc[region] = regions[region];
        return acc;
      }, {});

      setSortedSpots(sortedRegionsObj);
    }
  }, [spots]);

  return (
    <div className="home-container">
      <h1>Middle Earth Stays</h1>
      {Object.keys(sortedSpots).map((region) => (
        <div key={region} className="region">
          <h2>{region}</h2>
          <div className="spots-grid">
            {sortedSpots[region].slice(0, 4).map((spot) => (
              <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-link">
                <div className="spot">
                  <CustomTooltip title={spot.name} arrow placement="top">
                    <img src={spot.previewImage} alt={spot.name} />
                  </CustomTooltip>
                  <div className="spot-info">
                    <div className="spot-details">
                      <p>{spot.city}, {spot.state}</p>
                      <p className="star-rating">⭐ {spot.avgRating}</p>
                    </div>
                    <p className="spot-price">${spot.price} per night</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {sortedSpots[region].length > 4 && (
            <div className="more-link-container">
              <Link to={`/spots/state/${region}`} className="more-link">More</Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
