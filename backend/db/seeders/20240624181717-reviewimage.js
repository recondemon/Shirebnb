"use strict";

const { ReviewImage } = require("../models"); // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "https://example.com/images/bag-end-review1.jpg",
        },
        {
          reviewId: 2,
          url: "https://example.com/images/bag-end-review2.jpg",
        },
        {
          reviewId: 3,
          url: "https://example.com/images/rivendell-review1.jpg",
        },
        {
          reviewId: 4,
          url: "https://example.com/images/rivendell-review2.jpg",
        },
        {
          reviewId: 5,
          url: "https://example.com/images/erebor-review1.jpg",
        },
        {
          reviewId: 6,
          url: "https://example.com/images/erebor-review2.jpg",
        },
        {
          reviewId: 7,
          url: "https://example.com/images/lothlorien-review1.jpg",
        },
        {
          reviewId: 8,
          url: "https://example.com/images/lothlorien-review2.jpg",
        },
        {
          reviewId: 9,
          url: "https://example.com/images/minas-tirith-review1.jpg",
        },
        {
          reviewId: 10,
          url: "https://example.com/images/minas-tirith-review2.jpg",
        },
      ],
      options,
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {},
    );
  },
};
