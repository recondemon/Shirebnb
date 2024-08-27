import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot, addImageToSpot, uploadTemporaryImage } from '../../store/spots';
import './createSpot.css';
import { Plus } from 'lucide-react';

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
  const [images, setImages] = useState([{ url: '', file: null }]);
  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Count selected images
  const selectedUrlImagesCount = images.filter(image => !image.tempId && image.selected).length;
  const selectedUploadedImagesCount = images.filter(image => image.tempId && image.selected).length;

  // Function to handle image file upload
  const handleUploadImage = async (file) => {
    setUploading(true);

    try {
      const result = await dispatch(uploadTemporaryImage(file));
      const newImage = { url: result.url, file: null, tempId: result.tempId, selected: false };

      if (!previewImage) {
        setPreviewImage(result.url); // Set as preview image if none exists
      } else {
        setImages(prevImages => [...prevImages, newImage]);
      }

      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    } finally {
      setUploading(false);
    }
  };

  // Function to add an image URL input field
  const handleAddImageUrl = (e) => {
    e.preventDefault();
    setImages([...images, { url: '', file: null, selected: false }]);
  };

  // Function to handle image selection
  const handleImageSelect = (index, isSelected) => {
    const newImages = [...images];
    newImages[index].selected = isSelected;
    setImages(newImages);
  };

  // Function to remove an image
  const handleRemoveImage = () => {
    const newImages = images.filter((image) => !image.selected);
    setImages(newImages);

    if (newImages.length === 0) {
      setPreviewImage('');
    }
  };

  // Function to set a preview image
  const handleSetPreviewImage = (url) => {
    const currentPreviewImage = previewImage;

    // Move the current preview image to the images list if it exists
    const updatedImages = currentPreviewImage
      ? [{ url: currentPreviewImage, selected: false }, ...images.filter(image => image.url !== currentPreviewImage)]
      : images;

    // Set the selected image as the new preview image
    setPreviewImage(url);

    // Update the image list to exclude the new preview image
    setImages(updatedImages.filter(image => image.url !== url));
  };

  // Function to validate the description field
  const validateDescription = () => {
    const errors = {};
    if (description.length < 30) {
      errors.description = 'Description must be at least 30 characters long';
    }
    return errors;
  };

  // Function to validate image URLs and files
  const validateImages = () => {
    const errors = {};
    const validImageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;

    let imageProvided = false;

    images.forEach((image, index) => {
      if (image.url) {
        if (!validImageUrlRegex.test(image.url)) {
          errors[index] = `Image URL ${index + 1} is not valid.`;
        } else {
          imageProvided = true;
        }
      } else if (image.file) {
        imageProvided = true;
      }
    });

    if (!imageProvided) {
      errors.noImage = 'Please provide at least one image.';
    }

    if (!previewImage) {
      errors.noPreview = 'Please select a preview image.';
    }

    return errors;
  };

  // Function to handle changes to image URLs or files
  const handleImageChange = (index, value, isFile = false) => {
    const newImages = [...images];
    if (isFile) {
      newImages[index].file = value;
      newImages[index].url = URL.createObjectURL(value);
    } else {
      newImages[index].url = value;
      newImages[index].file = null;
    }
    
    setImages(newImages);
  
    // Automatically set the first image as the preview image
    if (!previewImage && newImages[index].url) {
      setPreviewImage(newImages[index].url);
    }
  };

  const validateAddress = () => {
    const errors = {};
    if (address.length < 5) {
      errors.address = 'Street address must be at least 5 characters long';
    }
    return errors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitErrors({});
    setImageErrors({});
  
    const validationErrors = {
      ...validateDescription(),
      ...validateAddress()
    };
    const imageValidationErrors = validateImages();
  
    if (Object.keys(validationErrors).length > 0 || Object.keys(imageValidationErrors).length > 0) {
      setSubmitErrors(validationErrors);
      setImageErrors(imageValidationErrors);
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
  
    if (lat) newSpot.lat = parseFloat(lat);
    if (lng) newSpot.lng = parseFloat(lng);
  
    try {
      const createdSpot = await dispatch(createSpot(newSpot));
      if (createdSpot) {
        for (let image of images) {
          if (image.tempId) {
            // Associate the temporary image with the newly created spot
            await dispatch(addImageToSpot(createdSpot.id, { tempId: image.tempId, preview: image.url === previewImage }));
          } else if (image.url) {
            // Add URL-based image
            await dispatch(addImageToSpot(createdSpot.id, { url: image.url, preview: image.url === previewImage }));
          }
        }
        console.log('Navigating to spot details page with ID:', createdSpot.id);
        navigate(`/spots/${createdSpot.id}`);
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
  
  <div className="form-group">
    <label className="form-label">
      Country
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
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
          onChange={(e) => setAddress(e.target.value)}
          required
          className="form-input"
        />
        {submitErrors.address && (
          <p className="error-message">{submitErrors.address}</p>
        )}
      </label>
  </div>

  <div className="form-group">
    <label className="form-label">
      City
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="form-input"
      />
    </label>
    <label className="form-label">
  Region
  <select
    value={state}
    onChange={(e) => setState(e.target.value)}
    required
    className="form-input select-input" // Adding select-input class for any specific styles needed
  >
    <option value="" disabled>Select a region</option> {/* Default placeholder option */}
    <option value="The Shire">The Shire</option>
    <option value="Eriador">Eriador</option>
    <option value="Wilderland">Wilderland</option>
    <option value="Rhovanion">Rhovanion</option>
  </select>
</label>

  </div>

  <div className="form-group">
    <label className="form-label">
      Latitude (optional)
      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        className="form-input"
      />
    </label>
    <label className="form-label">
      Longitude (optional)
      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
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

        <div>
          <h2>Liven up your spot with photos</h2>
          <p>Add at least one image to create a spot.</p>

          {/* Image URL Input Fields */}
          <div className="image-url-container">
            {images
              .filter(image => !image.tempId) // Exclude uploaded images
              .map((image, index) => (
                <div key={index} className="image-url-input">
                  <input
                    type="checkbox"
                    checked={image.selected || false}
                    onChange={(e) => handleImageSelect(index, e.target.checked)}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={image.url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="url-input"
                  />
                  {imageErrors[index] && (
                    <p className="error-message">{imageErrors[index]}</p>
                  )}
                </div>
              ))}

            {/* Control Buttons for URL-based images */}
            {selectedUrlImagesCount > 0 && (
              <div className="url-image-options">
                <button
                  type="button"
                  onClick={() => {
                    const selectedImage = images.find(image => image.selected);
                    handleSetPreviewImage(selectedImage.url);
                  }}
                  disabled={selectedUrlImagesCount !== 1}
                  className={selectedUrlImagesCount !== 1 ? 'button-disabled' : ''}
                >
                  Make Preview Image
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                >
                  Remove Selected Image URLs
                </button>
              </div>
            )}
          </div>

          {/* Link to add another image URL input */}
          <div className='add-url-link'>
            <a href="#add-image" onClick={handleAddImageUrl} className='add-url-link'>
              <Plus className='plus'/> Add Another Image URL
            </a>
          </div>

          {/* Image Upload */}
          <div className="upload-image-container">
            <input
              type="file"
              onChange={(e) => handleUploadImage(e.target.files[0])}
              disabled={uploading}
            />
            {uploading && <p className="loading-message">Uploading image...</p>}
            {uploadSuccess && !uploading && <p className="success-message">Image successfully uploaded</p>}
          </div>

          {imageErrors.noImage && (
            <p className="error-message">{imageErrors.noImage}</p>
          )}
          {imageErrors.noPreview && (
            <p className="error-message">{imageErrors.noPreview}</p>
          )}

          {/* Preview Image */}
          {previewImage && (
            <div className="preview-image-container">
              <h3>Preview Image</h3>
              <div className="image-container">
                <img src={previewImage} alt="Preview" className="uploaded-image-preview" />
                <span className="preview-image-label">Preview Image</span>
              </div>
            </div>
          )}

          {/* Display all uploaded and URL-based images in a single row */}
          {images.length > 1 && (
            <div className="uploaded-images-container">
              {images
                .filter(image => image.url !== previewImage) // Exclude preview image
                .map((image, index) => (
                  <div key={index} className="uploaded-image-item">
                    <div className="image-checkbox-container">
                      <input
                        type="checkbox"
                        checked={image.selected || false}
                        onChange={(e) => handleImageSelect(index, e.target.checked)}
                      />
                      <img src={image.url} alt={`Uploaded ${index + 1}`} className="uploaded-image-preview" />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Control Buttons for Uploaded Images */}
          {selectedUploadedImagesCount > 0 && (
            <div className="image-options">
              <button
                type="button"
                onClick={() => {
                  const selectedImage = images.find(image => image.selected);
                  handleSetPreviewImage(selectedImage.url);
                }}
                disabled={selectedUploadedImagesCount !== 1}
                className={selectedUploadedImagesCount !== 1 ? 'button-disabled' : ''}
              >
                Make Preview Image
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={images.length === 1}
                className={images.length === 1 ? 'button-disabled' : ''}
              >
                Remove Selected Image
              </button>
            </div>
          )}
        </div>
        {submitErrors.address && (
          <p className="error-message">{submitErrors.address}</p>
        )}
                  {submitErrors.description && (
            <p className="error-message">{submitErrors.description}</p>
          )}
          {errors && (
            <p className="error-message">{errors.global}</p>
          )}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpotPage;
