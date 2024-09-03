import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSpotById, updateSpot } from '../../store/spots';
import './updateSpot.css';

function UpdateSpotPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spot = useSelector(state => state.spots.singleSpot);
  const [loading, setLoading] = useState(true); // Loading state
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchSpotById(spotId));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Failed to fetch spot:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    loadData();
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot) {
      setAddress(spot.address || '');
      setCity(spot.city || '');
      setState(spot.state || '');
      setCountry(spot.country || '');
      setName(spot.name || '');
      setDescription(spot.description || '');
      setPrice(spot.price || '');
      setPreviewImage(spot.previewImage || '');
    }
  }, [spot]);

  const validateFields = () => {
    const newErrors = {};

    if (address.length < 10) {
      newErrors.address = 'Street address must be at least 10 characters long';
    }

    if (address.length > 254) {
      newErrors.address = 'Street address must be no longer than 255 characters long';
    }

    if (city.length < 5) {
      newErrors.city = 'City must be at least 5 characters long';
    }

    if (city.length > 99) {
      newErrors.city = 'City must be no longer than 100 characters long';
    }

    if (state.length < 5) {
      newErrors.state = 'State must be at least 5 characters long';
    }

    if (state.length > 49) {
      newErrors.state = 'State must be no longer than 50 characters long';
    }

    if (country.length < 5) {
      newErrors.country = 'Country must be at least 5 characters long';
    }

    if (country.length > 99) {
      newErrors.country = 'Country must be no longer than 100 characters long';
    }

    if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    }

    if (description.length > 1000) {
      newErrors.description = 'Description cannot be more than 1000 characters long';
    }

    if (isNaN(price) || price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    // Validate form fields
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedSpot = {
        address,
        city,
        state,
        country,
        name,
        description,
        price: parseFloat(price),
        previewImage,
      };

      const updated = await dispatch(updateSpot(spotId, updatedSpot));
      if (updated) {
        navigate(`/spots/${updated.id}`);
      }
    } catch (error) {
      const errorData = await error.json();
      setErrors(errorData.errors || { global: 'An unexpected error occurred' });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="update-spot-page">
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
        {/* Location Inputs */}
        <div>
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they book a reservation.</p>
          <div className="form-group">
            <label className="form-label">
              Country
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                required
                className="form-input"
              />
            </label>
            <label className="form-label">
              Street Address
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                className="form-input"
              />
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">
              City
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
                className="form-input"
              />
            </label>
            <label className="form-label">
              State
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={e => setState(e.target.value)}
                required
                className="form-input"
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <div className="description-counter">
            {description.length}/1000
          </div>
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <h2>Create a title for your spot</h2>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* Price */}
        <div>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="priceInput">
            <h2>$ </h2>
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>
        </div>

        {/* Preview Image */}
        <div>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={e => setPreviewImage(e.target.value)}
          />
          {errors.previewImage && (
            <p className="error-text">{errors.previewImage}</p>
          )}
        </div>

        {errors && (
          <div className="errors">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
}

export default UpdateSpotPage;
