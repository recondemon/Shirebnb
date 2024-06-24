'use strict';

const { SpotImage } = require('../models');  // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://example.com/images/bag-end1.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://example.com/images/bag-end2.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://example.com/images/rivendell1.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://example.com/images/rivendell2.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://example.com/images/erebor1.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://example.com/images/erebor2.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://example.com/images/lothlorien1.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://example.com/images/lothlorien2.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://example.com/images/minas-tirith1.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://example.com/images/minas-tirith2.jpg",
        preview: false
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, options);
  }
};
