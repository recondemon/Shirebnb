'use strict';

const { Spot } = require('../models');  // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1, // Frodo Baggins
        address: "Bagshot Row, Hobbiton",
        city: "Hobbiton",
        state: "The Shire",
        country: "Middle Earth",
        lat: -37.8723,
        lng: 175.6828,
        name: "Bag End",
        description: "A cozy hobbit hole nestled in the hills of Hobbiton. Enjoy the charming circular doors and windows, lush gardens, and the peaceful countryside. Ideal for a relaxing getaway.",
        price: 150.00,
      },
      {
        ownerId: 9, // Elrond
        address: "Valley of Imladris",
        city: "Rivendell",
        state: "Eriador",
        country: "Middle Earth",
        lat: -35.1023,
        lng: 173.8251,
        name: "Rivendell Retreat",
        description: "Experience the serenity and beauty of Rivendell, the Last Homely House east of the Sea. Nestled in a lush valley, this elven sanctuary offers tranquility and breathtaking views.",
        price: 250.00,
      },
      {
        ownerId: 5, // Gimli
        address: "Desolation of Smaug",
        city: "Lonely Mountain",
        state: "Wilderland",
        country: "Middle Earth",
        lat: -36.9656,
        lng: 175.2338,
        name: "Erebor's Majesty",
        description: "Stay within the ancient halls of Erebor, the Lonely Mountain. Discover the grandeur of the dwarven kingdom, with its massive chambers and intricate carvings. Perfect for adventurers and history enthusiasts.",
        price: 300.00,
      },
      {
        ownerId: 8, // Galadriel
        address: "Lorien Woods",
        city: "Lothlorien",
        state: "Rhovanion",
        country: "Middle Earth",
        lat: -37.1234,
        lng: 175.4567,
        name: "Golden Wood Haven",
        description: "Find peace among the golden leaves of Lothlorien. This enchanting elven treehouse offers a unique blend of nature and comfort, set high in the trees with stunning views of the surrounding forest.",
        price: 200.00,
      },
      {
        ownerId: 7, // Boromir
        address: "Minas Tirith",
        city: "Gondor",
        state: "Gondor",
        country: "Middle Earth",
        lat: -36.8485,
        lng: 174.7633,
        name: "Citadel Suite",
        description: "Stay in the majestic city of Minas Tirith, the White City of Gondor. This suite offers luxury accommodations with views of the rolling plains and the distant mountains, ideal for those seeking a regal experience.",
        price: 350.00,
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Bag End", "Rivendell Retreat", "Erebor's Majesty", "Golden Wood Haven", "Citadel Suite"] }
    }, {});
  }
};
