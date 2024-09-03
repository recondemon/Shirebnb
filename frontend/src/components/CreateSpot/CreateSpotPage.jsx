import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	createSpot,
	addImageToSpot,
	uploadTemporaryImage,
} from '../../store/spots';
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
	const [uploadSuccess] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [showDeprecationNotice, setShowDeprecationNotice] = useState(false);

	// Count selected images
	const selectedUrlImagesCount = images.filter(
		image => !image.tempId && image.selected
	).length;
	const selectedUploadedImagesCount = images.filter(
		image => image.tempId && image.selected
	).length;

	useEffect(() => {
		// Cleanup function to reset state when component unmounts
		return () => {
			setAddress('');
			setCity('');
			setState('');
			setCountry('');
			setLat('');
			setLng('');
			setName('');
			setDescription('');
			setPrice('');
			setPreviewImage('');
			setImages([]);
			setErrors({});
		};
	}, []);

	// Function to handle image file upload
	const handleUploadImage = async file => {
		setUploading(true);

		try {
			const result = await dispatch(uploadTemporaryImage(file));
			const newImage = {
				url: result.url,
				file: null,
				tempId: result.tempId,
				selected: false,
			};

			if (!previewImage) {
				setPreviewImage(result.url); // Set as preview image if none exists
			} else {
				setImages(prevImages => [...prevImages, newImage]);
			}

			setUploading(false);
			setShowDeprecationNotice(true); // Show the notice after upload
		} catch (error) {
			console.error('Error uploading image:', error.message);
			setUploading(false);
		}
	};

	// Function to close the notice
	const closeNotice = () => {
		setShowDeprecationNotice(false);
	};

	// Function to add an image URL input field
	const handleAddImageUrl = e => {
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
		const newImages = images.filter(image => !image.selected);
		setImages(newImages);

		if (newImages.length === 0) {
			setPreviewImage('');
		}
	};

	// Function to set a preview image
	const handleSetPreviewImage = url => {
		const currentPreviewImage = previewImage;

		// Move the current preview image to the images list if it exists
		const updatedImages = currentPreviewImage
			? [
					{ url: currentPreviewImage, selected: false },
					...images.filter(image => image.url !== currentPreviewImage),
				]
			: images;

		// Set the selected image as the new preview image
		setPreviewImage(url);

		// Update the image list to exclude the new preview image
		setImages(updatedImages.filter(image => image.url !== url));
	};

	const validateFields = () => {
		const errors = {};

		// Validate address
		if (address.length < 10) {
			errors.address = 'Street address must be at least 10 characters long';
		}

		if (address.length > 254) {
			errors.address = 'Street address must be no longer than 255 characters long';
		}

		if (city.length < 5) {
			errors.address = 'City must be at least 5 character long';
		}

		if (city.length > 99) {
			errors.address = 'City must be no longer than 100 characters long';
		}

		if (state.length < 5) {
			errors.address = 'State must be at least 5 characters long';
		}

		if (state.length > 49) {
			errors.address = 'State must be no longer than 50 characters long';
		}

		if (country.length < 5) {
			errors.address = 'Country must be at least 5 characters long';
		}

		if (country.length > 99) {
			errors.address = 'Country must be no longer than 100 characters long';
		}

		// Validate description
		if (description.length < 30) {
			errors.description = 'Description must be at least 30 characters long';
		}

		// Validate price
		if (price <= 0) {
			errors.price = 'Price per night must be a positive number';
		}

		// Validate image URLs and files
		const imageValidationErrors = validateImages();
		return { ...errors, ...imageValidationErrors };
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

		if (!previewImage) {
			errors.noPreview = 'Please select a preview image.';
		} else {
			imageProvided = true;
		}

		if (!imageProvided) {
			errors.noImage = 'Please provide at least one image.';
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

	const handleSubmit = async e => {
		e.preventDefault();
		setErrors({});
		setSubmitErrors({});
		setImageErrors({});

		// Validate form fields
		const validationErrors = validateFields();

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

		if (lat) newSpot.lat = parseFloat(lat);
		if (lng) newSpot.lng = parseFloat(lng);

		try {
			const createdSpot = await dispatch(createSpot(newSpot));
			if (createdSpot) {
				for (let image of images) {
					if (image.tempId) {
						// Associate the temporary image with the newly created spot
						await dispatch(
							addImageToSpot(createdSpot.id, {
								tempId: image.tempId,
								preview: image.url === previewImage,
							})
						);
					} else if (image.url) {
						// Add URL-based image
						await dispatch(
							addImageToSpot(createdSpot.id, {
								url: image.url,
								preview: image.url === previewImage,
							})
						);
					}
				}

				// Reset form state after successful submission
				setAddress('');
				setCity('');
				setState('');
				setCountry('');
				setLat('');
				setLng('');
				setName('');
				setDescription('');
				setPrice('');
				setPreviewImage('');
				setImages([]);

				// Navigate to the newly created spot's details page
				navigate(`/spots/${createdSpot.id}`);
			}
		} catch (error) {
			const errorData = error.json
				? await error.json()
				: { global: 'An unexpected error occurred' };
			setErrors(errorData.errors || { global: 'An unexpected error occurred' });
		}
	};

	return (
		<div className="create-spot-page">
			<h1>Create a New Spot</h1>
			<form onSubmit={handleSubmit}>
				{/* Location Inputs */}
				<div>
					<h2>Where&apos;s your place located?</h2>
					<p>
						Guests will only get your exact address once they&apos;ve booked a
						reservation.
					</p>

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
							Region
							<select
								value={state}
								onChange={e => setState(e.target.value)}
								required
								className="form-input select-input" // Adding select-input class for any specific styles needed
							>
								<option value="" disabled>
									Select a region
								</option>{' '}
								{/* Default placeholder option */}
								<option value="The Shire">The Shire</option>
								<option value="Eriador">Eriador</option>
								<option value="Wilderland">Wilderland</option>
								<option value="Rhovanion">Rhovanion</option>
							</select>
						</label>
						{submitErrors.address && (
							<p className="error-message">{submitErrors.address}</p>
						)}
					</div>

					<div className="form-group">
						<label className="form-label">
							Latitude (optional)
							<input
								type="number"
								placeholder="Latitude"
								value={lat}
								onChange={e => setLat(e.target.value)}
								className="form-input"
							/>
						</label>
						<label className="form-label">
							Longitude (optional)
							<input
								type="number"
								placeholder="Longitude"
								value={lng}
								onChange={e => setLng(e.target.value)}
								className="form-input"
							/>
						</label>
					</div>
				</div>

				{/* Description */}
				<div>
					<h2>Describe your place to guests</h2>
					<p>
						Mention the best features of your space, any special amenities like
						fast wifi or parking, and what you love about the neighborhood.
					</p>
					<textarea
						placeholder="Please write at least 30 characters"
						value={description}
						onChange={e => setDescription(e.target.value)}
						maxLength={1000}
						required
					/>
					<div className="character-count">{description.length}/1000</div>
					{submitErrors.description && (
						<p className="error-message">{submitErrors.description}</p>
					)}
				</div>

				{/* Title */}
				<div>
					<h2>Create a title for your spot</h2>
					<p>
						Catch guests&apos; attention with a spot title that highlights what
						makes your place special.
					</p>
					<input
						type="text"
						placeholder="Name of your spot"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>

				{/* Price */}
				<div>
					<h2>Set a base price for your spot</h2>
					<p>
						Competitive pricing can help your listing stand out and rank higher
						in search results.
					</p>
					<div className="priceInput">
						<h2>$ </h2>
						<input
							type="number"
							placeholder="Price per night (USD)"
							value={price}
							onChange={e => setPrice(e.target.value)}
							required
						/>
					</div>
					{submitErrors.price && (
						<p className="error-message">{submitErrors.price}</p>
					)}
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
										onChange={e => handleImageSelect(index, e.target.checked)}
									/>
									<input
										type="text"
										placeholder="Image URL"
										value={image.url}
										onChange={e => handleImageChange(index, e.target.value)}
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
									className={
										selectedUrlImagesCount !== 1 ? 'button-disabled' : ''
									}
								>
									Make Preview Image
								</button>
								<button type="button" onClick={handleRemoveImage}>
									Remove Selected Image URLs
								</button>
							</div>
						)}
					</div>

					{/* Link to add another image URL input */}
					<div className="add-url-link">
						<a
							href="#add-image"
							onClick={handleAddImageUrl}
							className="add-url-link"
						>
							<Plus className="plus" /> Add Another Image URL
						</a>
					</div>

					{/* Image Upload */}
					<div className="upload-image-container">
						<input
							type="file"
							onChange={e => handleUploadImage(e.target.files[0])}
							disabled={uploading}
						/>
						{uploading && <p className="loading-message">Uploading image...</p>}
						{uploadSuccess && !uploading && (
							<p className="success-message">Image successfully uploaded</p>
						)}
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
								<img
									src={previewImage}
									alt="Preview"
									className="uploaded-image-preview"
								/>
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
												onChange={e =>
													handleImageSelect(index, e.target.checked)
												}
											/>
											<img
												src={image.url}
												alt={`Uploaded ${index + 1}`}
												className="uploaded-image-preview"
											/>
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
								className={
									selectedUploadedImagesCount !== 1 ? 'button-disabled' : ''
								}
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
				{submitErrors.state && (
					<p className="error-message">{submitErrors.state}</p>
				)}
				{submitErrors.country && (
					<p className="error-message">{submitErrors.country}</p>
				)}

				{submitErrors.address && (
					<p className="error-message">{submitErrors.address}</p>
				)}
				{submitErrors.description && (
					<p className="error-message">{submitErrors.description}</p>
				)}
				{submitErrors.price && (
					<p className="error-message">{submitErrors.price}</p>
				)}
				{errors.global && <p className="error-message">{errors.global}</p>}
				{errors && <p className="error-message">{errors.global}</p>}

				{/* Deprecation Notice Modal */}
				{showDeprecationNotice && (
					<div className="deprecation-modal">
						<div className="deprecation-modal-content">
							<p>
								Please note that the uploaded images feature is currently
								deprecated and may not render images properly on your
								spot&apos;s detail page. For the best results, we recommend
								adding images via URL. Thank you for your understanding.
							</p>
							<button onClick={closeNotice}>Close</button>
						</div>
					</div>
				)}

				<button type="submit">Create Spot</button>
			</form>
		</div>
	);
}

export default CreateSpotPage;
