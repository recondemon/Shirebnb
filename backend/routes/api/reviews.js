const express = require('express');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');

const { Op, Sequelize } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  try {
    const currentUser = req.user;
    const reviews = await Review.findAll({
      where: { userId: currentUser.id },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: Spot,
          include: [{
            model: SpotImage,
            attributes: ['url'],
            where: { preview: true },
            required: false
          }]
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"]
        }
      ]
    });
    res.status(200).json({ "Reviews": reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server error", "error": err.message });
  }
});


// edit an existing review
router.put("/:reviewId", requireAuth, async (req, res) => {
  try {
    const currentUser = req.user;
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;

    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      return res.status(404).json({ "message": "Review couldn't be found" });
    } else if (currentUser.id !== existingReview.userId) {
      return res.status(403).json({ "message": "Forbidden" });
    }

    if (!review || !stars || isNaN(stars) || stars > 5 || stars < 1) {
      return res.status(400).json({
        "message": "Bad Request",
        "errors": {
          "review": !review ? "Review text is required" : undefined,
          "stars": (!stars || isNaN(stars) || stars > 5 || stars < 1) ? "Stars must be an integer from 1 to 5" : undefined
        }
      });
    }

    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();
    res.status(200).json(existingReview);

  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server error", "error": err.message });
  }
});

// add an image to a review
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  try {
    const currentUser = req.user;
    const reviewId = req.params.reviewId;
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ "message": "Review couldn't be found" });
    } 
    if (currentUser.id !== existingReview.userId) {
      return res.status(403).json({ "message": "Forbidden" });
    }

    const imageCount = await ReviewImage.count({ where: { reviewId: reviewId } });
    if (imageCount >= 10) {
      return res.status(403).json({ "message": "Maximum number of images for this resource was reached" });
    }

    const postImage = await ReviewImage.create({
      reviewId, url: req.body.url
    });
    res.status(200).json(postImage);

  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server error", "error": err.message });
  }
});

// delete a review belonging to current user
router.delete("/:reviewId", requireAuth, async (req, res) => {
  try {
    const currentUser = req.user;
    const reviewId = req.params.reviewId;
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ "message": "Review couldn't be found" });
    } else if (currentUser.id !== existingReview.userId) {
      return res.status(403).json({ "message": "Forbidden" });
    }

    await existingReview.destroy();
    res.status(200).json({ "message": "Successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message": "Server error", "error": err.message });
  }
});


module.exports = router;