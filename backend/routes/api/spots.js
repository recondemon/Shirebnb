
const express = require('express');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');
const multer = require('multer');
const { Op, Sequelize } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formatDate = (date) => {
  const isoString = date.toISOString();
  return isoString.substring(0, 19).replace('T', ' ');
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

/****** GET ROUTES ******************************************/

// Get spots by current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      where: {
        ownerId: req.user.id,
      },
    });

    const response = await Promise.all(
      spots.map(async (spot) => {
        const reviews = await Review.findAll({
          where: {
            spotId: spot.id,
          },
          attributes: ['stars'],
        });

        const avgRating =
          reviews.length > 0
            ? (
                reviews.reduce((sum, review) => sum + review.stars, 0) /
                reviews.length
              ).toFixed(1)
            : "no ratings yet!";

        const spotImage = await SpotImage.findOne({
          where: {
            spotId: spot.id,
            preview: true,
          },
          attributes: ['url'],
        });

        return {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: parseFloat(spot.lat),
          lng: parseFloat(spot.lng),
          name: spot.name,
          description: spot.description,
          price: spot.price,
          createdAt: formatDate(spot.createdAt),
          updatedAt: formatDate(spot.updatedAt),
          avgRating,
          previewImage: spotImage ? spotImage.url : "No preview image available",
        };
      })
    );

    res.status(200).json({ Spots: response });
  } catch (err) {
    next(err);
  }
});

// Get details of a spot by spotId
router.get("/:spotId", async (req, res) => {
  try {
    let spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId, {
      attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt"],
      include: [
        {
          model: SpotImage,
          as: "SpotImages",
          attributes: ["id", "url", "preview"]
        },
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"]
        }
      ],
    });

    if (!spot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });
    }

    let reviews = await Review.findAll({
      where: { spotId: spot.id },
      attributes: ["stars"]
    });

    let numReviews = reviews.length;
    let sumOfStarRating = reviews.reduce((sum, review) => sum + review.stars, 0);
    let avgStarRating = numReviews > 0 ? (sumOfStarRating / numReviews).toFixed(1) : "no reviews yet!";

    spot.dataValues.numReviews = numReviews;
    spot.dataValues.avgStarRating = avgStarRating;

    res.status(200);
    return res.json(spot);
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});

// Get all reviews of a spot
router.get("/:spotId/reviews", async (req, res) => {
  try {
    let spotId = req.params.spotId;
    let spot = await Spot.findByPk(spotId);
    if (!spot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });
    }
    let reviews = await Review.findAll({
      where: { spotId: spotId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"]
        }
      ]
    });
    res.status(200);
    return res.json({ "Reviews": reviews });
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});

// Get all bookings of a spot by spotId
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user;
    let spotId = req.params.spotId;

    let spot = await Spot.findOne({
      where: { id: spotId }
    });

    if (!spot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });
    }

    let bookings;
    if (spot.ownerId === currentUser.id) {
      bookings = await Booking.findAll({
        where: { spotId: spotId },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"]
          }
        ]
      });

      res.status(200);
      return res.json({ "Bookings": bookings })

    } else {
      bookings = await Booking.findAll({
        where: { spotId: spotId },
        attributes: ["spotId", "startDate", "endDate"]
      });

      res.status(200);
      return res.json({ "Bookings": bookings });
    }
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});


// Get all spots
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;

    if (page < 1 || size < 1 || size > 20) {
      return res.status(400).json({
        "message": "Bad Request",
        "errors": {
          "page": page < 1 ? "Page must be greater than or equal to 1" : undefined,
          "size": size < 1 || size > 20 ? "Size must be between 1 and 20" : undefined
        }
      });
    }

    const where = {};
    const attributes = ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'];
    const pagination = {
      limit: size,
      offset: (page - 1) * size
    };

    const latLngValidation = (value, type) => {
      const num = parseFloat(value);
      if (isNaN(num) || num < (type === 'lat' ? -90 : -180) || num > (type === 'lat' ? 90 : 180)) {
        throw new Error(`Invalid ${type}`);
      }
      return num;
    };

    try {
      ['minLat', 'maxLat', 'minLng', 'maxLng'].forEach(key => {
        if (req.query[key] !== undefined) {
          const boundaryType = key.substring(3).toLowerCase(); // 'lat' or 'lng'
          where[boundaryType] = {
            ...where[boundaryType],
            [key.includes('min') ? Op.gte : Op.lte]: latLngValidation(req.query[key], boundaryType)
          };
        }
      });
    } catch (error) {
      return res.status(400).json({ "message": "Bad Request", "errors": { [error.message.split(' ')[1]]: error.message } });
    }

    // Price validation
    ['minPrice', 'maxPrice'].forEach(key => {
      if (req.query[key] !== undefined) {
        const price = parseFloat(req.query[key]);
        if (isNaN(price) || price < 0) {
          return res.status(400).json({
            "message": "Bad Request",
            "errors": { [key]: `${key} must be greater than or equal to 0` }
          });
        }
        where.price = { ...where.price, [key.includes('min') ? Op.gte : Op.lte]: price };
      }
    });

    const results = await Spot.findAll({
      where,
      attributes,
      include: [{
        model: SpotImage,
        attributes: ['url'],
        where: { preview: true },
        required: false
      }],
      ...pagination
    });

    const totalSpots = await Spot.count({ where });
    const returnedSpots = results.length;

    const spots = await Promise.all(results.map(async (spot) => {
      const reviews = await Review.findAll({
        where: { spotId: spot.id },
        attributes: ['stars']
      });

      const avgRating = reviews.length > 0
        ? (
            reviews.reduce((sum, review) => sum + review.stars, 0) /
            reviews.length
          ).toFixed(1)
        : "no ratings yet!";

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: formatDate(spot.createdAt),
        updatedAt: formatDate(spot.updatedAt),
        avgRating,
        previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : "No preview image available"
      };
    }));
    console.log(spots);
    res.status(200).json({
      "Spots": spots,
      "page": page,
      "size": size,
      "returnedSpots": returnedSpots,
      "totalSpots": totalSpots
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server error" });
  }
});
/****** POST ROUTES ******************************************/

// Create a spot belonging to the current user
router.post("/", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user;

    let { address, city, state, country, lat, lng, name, description, price } = req.body;

    console.log("Received data:", { address, city, state, country, lat, lng, name, description, price });

    let errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price || isNaN(price) || price < 0) errors.price = "Price per day is required and must be a number equal to or greater than 0";

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      });
    }

    let createSpot = await Spot.create({
      ownerId: currentUser.id, address, city, state, country, name, description, price, lat, lng
    });

    console.log("Spot created successfully:", createSpot);

    res.status(201);
    return res.json(createSpot);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});


// Add an image to a spot
router.post("/:spotId/images", requireAuth, async (req, res) => {
  try {
    const currentUser = req.user;
    const spotId = req.params.spotId;

    const existingSpot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: currentUser.id
      }
    });

    if (!existingSpot) {
      return res.status(404).json({ message: "Spot could not be found or you are not the owner" });
    }

    const { url, preview } = req.body;

    const postImage = await SpotImage.create({
      spotId, 
      url, 
      preview
    });

    return res.status(200).json({
      id: postImage.id,
      url: postImage.url,
      preview: postImage.preview
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// Upload an image and associate it with a spot
router.post("/:spotId/images/upload", requireAuth, upload.single('image'), async (req, res) => {
  try {
    const currentUser = req.user;
    const spotId = req.params.spotId;

    const existingSpot = await Spot.findByPk(spotId);

    if (!existingSpot) {
      return res.status(404).json({ message: "Spot could not be found" });
    } else if (currentUser.id !== existingSpot.ownerId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const postImage = await SpotImage.create({
      spotId,
      url: `/uploads/${file.filename}`,
      preview: req.body.preview || false,
    });

    return res.status(200).json({
      id: postImage.id,
      url: postImage.url,
      preview: postImage.preview
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.post('/images/temporary-upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct the full URL to the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error('Error during image upload:', err);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

router.post('/:spotId/images/associate', requireAuth, async (req, res) => {
  try {
    const { tempId, preview } = req.body;
    const spotId = req.params.spotId;

    // Move the image from the temporary location to the final location
    // Update the database to associate the image with the spot

    res.status(200).json({
      spotId,
      url: finalUrl, // Final URL after moving the image
      preview,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to associate image with spot' });
  }
});


// Create a booking for a spot
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user;
    let spotId = req.params.spotId;

    let spot = await Spot.findOne({
      where: { id: spotId }
    });

    let booking = await Booking.findAll({
      where: { spotId: spotId }
    });

    let { startDate, endDate } = req.body
    let currentDate = new Date();
    let errors = {};

    for (let key in booking) {
      if (new Date(booking[key].startDate) > new Date(startDate) &&
        new Date(booking[key].endDate) < new Date(endDate)) {
        errors.conflicts = "Start date and end date conflict with an existing booking"

      } else if (new Date(booking[key].startDate) <= new Date(startDate) &&
        new Date(booking[key].endDate) >= new Date(endDate)) {
        errors.conflicts = "Start date and end date conflict with an existing booking"

      } else if (new Date(startDate) >= new Date(booking[key].startDate) &&
        new Date(startDate) <= new Date(booking[key].endDate)) {
        errors.startDate = "Start date conflicts with an existing booking";

      } else if (new Date(endDate) >= new Date(booking[key].startDate) &&
        new Date(endDate) <= new Date(booking[key].endDate)) {
        errors.endDate = "End date conflicts with an existing booking";
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(403);
      return res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        errors
      });
    }

    if (!spot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });

    } else if (spot.ownerId === currentUser.id) {
      res.status(403);
      return res.json({ "message": "You cannot book your own spot" });

    } else if (new Date(startDate) >= new Date(endDate)) {
      errors.endDate = "endDate cannot be on or before startDate";
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      });

    } else if (new Date(startDate) <= currentDate || new Date(endDate) <= currentDate) {
      errors.pastDates = "Cannot book past dates"
      res.status(403);
      return res.json({
        "message": "Bad Request",
        errors
      })

    } else {
      let createBooking = await Booking.create({
        spotId: +spotId, userId: currentUser.id, startDate, endDate
      });
      res.status(200);
      return res.json(createBooking);
    }
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});

router.post('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id; // Assuming you have user authentication set up

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        title: 'Resource Not Found',
        errors: { message: "The requested resource couldn't be found." },
      });
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({
      title: 'Server Error',
      errors: { message: 'Something went wrong on the server.' },
    });
  }
});

module.exports = router;

/****** PUT ROUTES ******************************************/

// Edit a spot belonging to current user
router.put("/:spotId", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user;
    let spotId = req.params.spotId;

    let existingSpot = await Spot.findByPk(spotId);
    if (!existingSpot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });

    } else if (currentUser.id !== existingSpot.ownerId) {
      res.status(403);
      return res.json({ "message": "Forbidden" });

    } else {
      let { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;

      let editSpot = await Spot.findOne({
        where: {
          id: spotId,
          ownerId: currentUser.id
        }
      });

      let errors = {};
      if (!address) errors.address = "Street address is required";
      if (!city) errors.city = "City is required";
      if (!state) errors.state = "State is required";
      if (!country) errors.country = "Country is required";
      if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
      if (!description) errors.description = "Description is required";
      if (!price || isNaN(price) || price < 0) errors.price = "Price per day is required and must be a number equal to or greater than 0";
      

      if (Object.keys(errors).length > 0) {
        res.status(400);
        return res.json({
          "message": "Bad Request",
          errors
        })
      }

      editSpot.address = address;
      editSpot.city = city;
      editSpot.country = country;
      editSpot.name = name;
      editSpot.description = description;
      editSpot.price = price;
      editSpot.previewImage = previewImage;

      await editSpot.save();
      res.status(200);
      return res.json(editSpot);
    }
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});


/****** DELETE ROUTES ******************************************/

// Delete a spot belonging to current user
router.delete("/:spotId", requireAuth, async (req, res) => {
  try {
    const currentUser = req.user;
    const spotId = req.params.spotId;

    const existingSpot = await Spot.findByPk(spotId);
    if (!existingSpot) {
      return res.status(404).json({ "message": "Spot could not be found" });
    } else if (currentUser.id !== existingSpot.ownerId) {
      return res.status(403).json({ "message": "Forbidden" });
    } else {
      // Delete related spot images
      await SpotImage.destroy({
        where: {
          spotId: spotId
        }
      });

      // Delete related reviews
      await Review.destroy({
        where: {
          spotId: spotId
        }
      });

      // Delete the spot
      await existingSpot.destroy();
      return res.status(200).json({ "message": "Spot successfully deleted" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "Server error", "error": err.message });
  }
});

module.exports = router;
