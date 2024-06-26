const express = require('express');
const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const { Op, Sequelize } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


/****** GET ROUTES ******************************************/

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

    let numReviews = await Review.aggregate("spotId", "count", { where: { spotId } });
    let findSumOfStarRatings = await Review.findOne({
      attributes: [
        [Spot.sequelize.literal("SUM(stars)"), "totalStars"]
      ],
      where: {
        spotId: spot.id
      }
    });

    let sumOfStarRating = findSumOfStarRatings.dataValues.totalStars
    let numberOfStarRatings = await Review.count({
      where: {
        spotId: spot.id
      }
    });

    let avgStarRating = Math.round((sumOfStarRating / numberOfStarRatings) * 10) / 10;

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

// Get spots by current user
router.get("/current", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user;
    let spots = await Spot.findAll({
      where: {
        ownerId: currentUser.id
      },
      include: [
        {
          model: SpotImage,
          attributes: ['url'],
          as: 'SpotImages',
          where: {
            preview: true
          },
          required: false
        },
        {
          model: Review,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.literal(`(SELECT AVG(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)`), 'avgRating']
        ],
        exclude: ['createdAt', 'updatedAt'] // Exclude fields if not needed
      }
    });

    res.status(200).json({ "Spots": spots });
  } catch (err) {
    console.error("Error fetching current user spots: ", err);
    res.status(500).json({ "message": "Server error", "error": err.message });
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

    res.status(200).json({
      "Spots": results,
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

    let errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (!lat || isNaN(lat)) errors.lat = "Latitude is invalid";
    if (!lng || isNaN(lng)) errors.lng = "Longitude is invalid";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price || isNaN(price) || price < 0) errors.price = "Price per day is required and must be a number equal to or greater than 0";

    if (Object.keys(errors).length > 0) {
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      });
    }

    let createSpot = await Spot.create({
      ownerId: currentUser.id, address, city, state, country, lat, lng, name, description, price
    });

    res.status(201);
    return res.json(createSpot);
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});

// Add an image to a spot
router.post("/:spotId/images", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user
    let spotId = req.params.spotId;

    let existingSpot = await Spot.findByPk(spotId);

    if (!existingSpot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });

    } else if (currentUser.id !== existingSpot.ownerId) {
      res.status(403);
      return res.json({ "message": "Forbidden" });

    } else {
      existingSpot = await Spot.findOne({
        where: {
          id: spotId,
          ownerId: currentUser.id
        }
      });

      let { url, preview } = req.body;

      let postImage = await SpotImage.create({
        spotId, url, preview
      });

      res.status(200);
      return res.json({
        id: postImage.id,
        url: postImage.url,
        preview: postImage.preview
      });
    }
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});

// Create a review for a spot
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  try {
    let currentUser = req.user;
    let spotId = req.params.spotId;

    let spot = await Spot.findOne({
      where: {
        id: spotId,
      }
    });

    if (!spot) {
      res.status(404);
      return res.json({ "message": "Spot could not be found" });
    }

    let existingReview = await Review.findOne({
      where: {
        spotId: spotId,
        userId: currentUser.id
      }
    });

    let { review, stars } = req.body;

    let errors = {};
    if (!review) errors.review = "Review text is required";
    if (!stars || isNaN(stars) || stars > 5 || stars < 1) errors.stars = "Stars must be from 1 to 5";
    if (Object.keys(errors).length > 0) {
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      })
    }

    if (existingReview) {
      res.status(500);
      return res.json({ "message": "User already has a review for this spot" });
    } else {
      let createReview = await Review.create({
        spotId, userId: currentUser.id, review, stars
      });
      res.status(201);
      return res.json(createReview);
    }
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
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
      if (!lat || isNaN(lat)) errors.lat = "Latitude is invalid";
      if (!lng || isNaN(lng)) errors.lng = "Longitude is invalid";
      if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
      if (!description) errors.description = "Description is required";
      if (!price || isNaN(price) || price < 0) errors.price = "Price per day is required and must be a number equal to or greater than 0";
      if (!previewImage) errors.previewImage = "Preview image is required";

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
      editSpot.lat = lat;
      editSpot.lng = lng;
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
      existingSpot = await Spot.findOne({
        where: {
          id: spotId,
          ownerId: currentUser.id
        }
      });

      await existingSpot.destroy();
      res.status(200);
      return res.json({ "message": "Spot successfully deleted" });
    }
  } catch (err) {
    res.status(500);
    return res.json({ "message": "Server error" });
  }
});

module.exports = router;
