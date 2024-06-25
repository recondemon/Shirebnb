const express = require('express');
const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const { Op, Sequelize } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
	const spots = await Spot.findAll({
		attributes: {
			include: [
				[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
			],
		},
		include: [
			{
				model: Review,
				as: 'Reviews',
				attributes: [],
			},
			{
				model: SpotImage,
				as: 'SpotImages',
				attributes: ['url'],
				where: { preview: true },
				required: false,
			},
		],
		group: ['Spot.id', 'SpotImages.id'],
	});

	const response = spots.map((spot) => ({
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
		createdAt: spot.createdAt,
		updatedAt: spot.updatedAt,
		avgRating: parseFloat(spot.dataValues.avgRating).toFixed(1),
		previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
	}));

	res.status(200).json({ Spots: response });
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const spots = await Spot.findAll({
            where: {
                ownerId: req.user.id,
            },
            attributes: {
                include: [
                    [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
                ],
            },
            include: [
                {
                    model: Review,
                    as: 'Reviews',
                    attributes: ['stars'],
                },
                {
                    model: SpotImage,
                    as: 'SpotImages',
                    attributes: ['url'],
                    where: { preview: true },
                    required: false,
                },
            ],
            group: ['Spot.id', 'SpotImages.id'],
        });

        const response = spots.map((spot) => ({
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
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: parseFloat(spot.dataValues.avgRating).toFixed(1),
            previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
        }));

        res.status(200).json({ Spots: response });
    } catch (error) {
        next(error);
    }
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
	const spotId = req.params.spotId;
   
	const spot = await Spot.findByPk(spotId, {
        attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt"],
		include: [
			{
				model: Review,
				as: 'Reviews',
				attributes: [],
			},
			{
				model: SpotImage,
				as: 'SpotImages',
				attributes: ['id', 'url', 'preview'],
			},
			{
				model: User,
				as: 'Owner',
				attributes: ['id', 'firstName', 'lastName'],
			},
        ],
	});

	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
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

	res.status(200).json(spot);
});

//Create a Spot
router.post('/', requireAuth, async (req, res) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	// Validation checks
	if (!address) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { address: 'Street address is required' },
		});
	}
	if (!city) {
		return res
			.status(400)
			.json({ message: 'Bad Request', errors: { city: 'City is required' } });
	}
	if (!state) {
		return res
			.status(400)
			.json({ message: 'Bad Request', errors: { state: 'State is required' } });
	}
	if (!country) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { country: 'Country is required' },
		});
	}
	if (lat < -90 || lat > 90) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { lat: 'Latitude must be within -90 and 90' },
		});
	}
	if (lng < -180 || lng > 180) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { lng: 'Longitude must be within -180 and 180' },
		});
	}
	if (name.length > 50) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { name: 'Name must be less than 50 characters' },
		});
	}
	if (!description) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { description: 'Description is required' },
		});
	}
	if (price <= 0) {
		return res.status(400).json({
			message: 'Bad Request',
			errors: { price: 'Price per day must be a positive number' },
		});
	}
	const spot = await Spot.create({
		ownerId: req.user.id, // Assuming ownerId comes from authenticated user
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	});
	res.status(201).json({
		address: spot.address,
		city: spot.city,
		state: spot.state,
		country: spot.country,
		lat: spot.lat,
		lng: spot.lng,
		name: spot.name,
		description: spot.description,
		price: spot.price,
	});
});

//edit spot image by id
router.post("/:spotId/images", requireAuth, async (req, res) => {
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
  });

//edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    try {
        // Find the spot by ID
        const spot = await Spot.findByPk(spotId);

        // If spot is not found, return 404 error
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }

        // Check if the spot belongs to the current user
        if (spot.ownerId !== userId) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to edit this spot"
            });
        }

        // Validate request body
        const errors = {};
        if (!address) errors.address = "Street address is required";
        if (!city) errors.city = "City is required";
        if (!state) errors.state = "State is required";
        if (!country) errors.country = "Country is required";
        if (lat < -90 || lat > 90) errors.lat = "Latitude must be within -90 and 90";
        if (lng < -180 || lng > 180) errors.lng = "Longitude must be within -180 and 180";
        if (name && name.length > 50) errors.name = "Name must be less than 50 characters";
        if (!description) errors.description = "Description is required";
        if (price <= 0) errors.price = "Price per day must be a positive number";

        // If there are validation errors, return 400 error
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: "Bad Request",
                errors
            });
        }

        // Update the spot with the new values
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;

        // Save the updated spot
        await spot.save();

        // Return the updated spot
        return res.status(200).json({
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
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

//delete a spot

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id; 

    try {
       
        const spot = await Spot.findByPk(spotId);

      
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }

     
        if (spot.ownerId !== userId) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to delete this spot"
            });
        }

        await Booking.destroy({ where: { spotId: spot.id } }); 
        await Review.destroy({ where: { spotId: spot.id } }); 
        await SpotImage.destroy({ where: { spotId: spot.id } }); 
       
        await spot.destroy();

        
        return res.status(200).json({
            message: "Successfully deleted"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});



module.exports = router;