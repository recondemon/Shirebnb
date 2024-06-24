'use strict';

const { Review } = require('../models');  // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 3, // Aragorn
        review: "Bag End was an incredible experience! The hobbit hole was cozy and charming. The countryside views were breathtaking. Highly recommended!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 4, // Legolas
        review: "A lovely and peaceful retreat. The gardens were beautiful and the hobbit-style home was delightful. Will definitely visit again.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1, // Frodo Baggins
        review: "Rivendell was magical. The elven architecture and the serene environment made for an unforgettable stay. Perfect for a quiet getaway.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2, // Samwise Gamgee
        review: "Amazing stay in Rivendell! The hidden valley was stunning and the accommodations were top-notch. Highly recommended for nature lovers.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 5, // Gimli
        review: "Erebor was a unique experience. The grandeur of the dwarven kingdom was impressive, and the history was fascinating. A must-visit!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 6, // Gandalf
        review: "Staying at Erebor was like stepping into another world. The massive chambers and intricate carvings were awe-inspiring. Would visit again.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 7, // Boromir
        review: "Lothlorien was enchanting. The treehouse was beautiful and the golden woods were magical. A perfect escape from the hustle and bustle.",
        stars: 5
      },
      {
        spotId: 4,
        userId: 8, // Galadriel
        review: "An amazing stay in the heart of Lothlorien. The views were breathtaking and the elven hospitality was exceptional. Highly recommended.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 1, // Frodo Baggins
        review: "Minas Tirith was majestic. The White City offered a regal experience and the views of the plains were stunning. A luxurious stay.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 9, // Elrond
        review: "A grand stay in Minas Tirith. The city was beautiful and the accommodations were luxurious. Perfect for those seeking a royal experience.",
        stars: 5
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, options);
  }
};
