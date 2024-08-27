import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import './moreSpots.css';

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

function MoreSpots() {
  const { region } = useParams(); // Extract the region from the URL
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const [filteredSpots, setFilteredSpots] = useState([]);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  useEffect(() => {
    if (spots.length > 0 && region) {
      // Filter spots based on the region
      const spotsInRegion = spots.filter((spot) => spot.state === region);
      setFilteredSpots(spotsInRegion);
    }
  }, [spots, region]);

  return (
    <div className="more-spots-container">
      <h1>Spots in {region}</h1>
      <div className="spots-grid">
        {filteredSpots.map((spot) => (
          <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-link">
            <div className="spot">
              <CustomTooltip title={spot.name} arrow placement="top">
                <img src={spot.previewImage} alt={spot.name} />
              </CustomTooltip>
              <div className="spot-info">
                <div className="spot-details">
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <p className="star-rating">⭐ {spot.avgRating}</p>
                </div>
                <p className="spot-price">${spot.price} per night</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoreSpots;
