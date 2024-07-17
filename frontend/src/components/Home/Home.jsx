import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import './home.css';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
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
  const containerRefs = useRef({});

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

  const handleScroll = (region, direction) => {
    const container = containerRefs.current[region];
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <h1>Middle Earth Stays</h1>
      {Object.keys(sortedSpots).map((region) => (
        <div key={region} className="region">
          <h2>{region}</h2>
          <div className="spots-container-wrapper">
            <button className="scroll-button left" onClick={() => handleScroll(region, 'left')}>&lt;</button>
            <div className="spots-container" ref={(el) => (containerRefs.current[region] = el)}>
              {sortedSpots[region].map((spot) => (
                <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-link">
                  <div className="spot">
                    <CustomTooltip title={spot.name} arrow placement="top">
                      <img src={spot.previewImage} alt={spot.name} className="spot-image" />
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
            <button className="scroll-button right" onClick={() => handleScroll(region, 'right')}>&gt;</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
