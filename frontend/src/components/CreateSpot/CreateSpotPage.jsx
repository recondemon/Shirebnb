import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot, addImageToSpot } from '../../store/spots';
import './createSpot.css';

function CreateSpotPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [images, setImages] = useState(['', '', '', '']);
  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});

  const validateDescription = () => {
    const errors = {};
    if (description.length < 30) {
      errors.description = 'Description must be at least 30 characters long';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitErrors({});

    const validationErrors = validateDescription();
    if (Object.keys(validationErrors).length > 0) {
      setSubmitErrors(validationErrors);
      return;
    }

    const newSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price: parseFloat(price),
      previewImage,
    };

    // Include lat and lng if they are provided
    if (lat) newSpot.lat = parseFloat(lat);
    if (lng) newSpot.lng = parseFloat(lng);

    try {
      const createdSpot = await dispatch(createSpot(newSpot));
      if (createdSpot) {
        for (let image of images) {
          if (image) {
            await dispatch(addImageToSpot(createdSpot.id, { url: image, preview: false }));
          }
        }
        // Add preview image to the spot
        await dispatch(addImageToSpot(createdSpot.id, { url: previewImage, preview: true }));
        navigate(`/spots/${createdSpot.id}`); // Navigate to the new spot's details page
      }
    } catch (error) {
      if (error.json) {
        const errorData = await error.json();
        setErrors(errorData.errors);
      } else {
        setErrors({ global: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <div className="create-spot-page">
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        {/* Location Inputs */}
        <div>
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they&apos;ve booked a reservation.</p>
          <label>
            Country
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Street Address
            <input
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <div className="inline-fields">
            <label>
              City
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <span className="comma">,</span>
            <label>
              State
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="inline-fields">
            <label>
              Latitude (optional)
              <input
                type="number"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
            <span className="comma">,</span>
            <label>
              Longitude (optional)
              <input
                type="number"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {submitErrors.description && (
            <p className="error-message">{submitErrors.description}</p>
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
            onChange={(e) => setName(e.target.value)}
            required
          />
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
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
          {images.map((image, index) => (
            <input
              key={index}
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => {
                const newImages = [...images];
                newImages[index] = e.target.value;
                setImages(newImages);
              }}
            />
          ))}
        </div>

        {errors && (
          <div className="errors">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpotPage;