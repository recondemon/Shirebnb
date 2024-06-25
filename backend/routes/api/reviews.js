const express = require('express');
const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const { Op, Sequelize } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all reviews by current user
router.get('/current', requireAuth, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                userId: req.user.id,
            },
            attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'],
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url'],
                },
            ],
        });

        return res.status(200).json({ Reviews: reviews });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;