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
      // The Shire
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
        ownerId: 2, // Samwise Gamgee
        address: "3 Bagshot Row",
        city: "Hobbiton",
        state: "The Shire",
        country: "Middle Earth",
        lat: -37.8723,
        lng: 175.6829,
        name: "Sam's Garden Cottage",
        description: "A lovely garden cottage with beautiful flowers and plants. Perfect for those who love gardening and nature.",
        price: 140.00,
      },
      {
        ownerId: 11, // Bilbo Baggins
        address: "1 Bag End",
        city: "Hobbiton",
        state: "The Shire",
        country: "Middle Earth",
        lat: -37.8724,
        lng: 175.6830,
        name: "Bilbo's Hobbit Hole",
        description: "A charming hobbit hole with a rich history. Enjoy the peaceful surroundings and the cozy atmosphere.",
        price: 160.00,
      },
      {
        ownerId: 12, // Merry Brandybuck
        address: "Brandy Hall",
        city: "Buckland",
        state: "The Shire",
        country: "Middle Earth",
        lat: -37.8719,
        lng: 175.6812,
        name: "Brandy Hall",
        description: "A large hobbit hole in Buckland. Perfect for large groups and family gatherings.",
        price: 180.00,
      },
      {
        ownerId: 13, // Pippin Took
        address: "Tuckborough",
        city: "Tuckborough",
        state: "The Shire",
        country: "Middle Earth",
        lat: -37.8730,
        lng: 175.6820,
        name: "Took Mansion",
        description: "A grand mansion in Tuckborough. Enjoy the luxury and comfort of a large hobbit family home.",
        price: 190.00,
      },
      // Eriador
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
        ownerId: 14, // Glorfindel
        address: "Glorfindel's House",
        city: "Rivendell",
        state: "Eriador",
        country: "Middle Earth",
        lat: -35.1024,
        lng: 173.8252,
        name: "Glorfindel's Haven",
        description: "A peaceful retreat in Rivendell. Enjoy the elven architecture and the serene environment.",
        price: 240.00,
      },
      {
        ownerId: 15, // Elrohir
        address: "Elrohir's House",
        city: "Rivendell",
        state: "Eriador",
        country: "Middle Earth",
        lat: -35.1025,
        lng: 173.8253,
        name: "Elrohir's Lodge",
        description: "A cozy lodge in Rivendell. Perfect for those seeking tranquility and natural beauty.",
        price: 230.00,
      },
      {
        ownerId: 16, // Elladan
        address: "Elladan's House",
        city: "Rivendell",
        state: "Eriador",
        country: "Middle Earth",
        lat: -35.1026,
        lng: 173.8254,
        name: "Elladan's Retreat",
        description: "A beautiful retreat in Rivendell. Enjoy the elven hospitality and the stunning views.",
        price: 260.00,
      },
      {
        ownerId: 9, // Elrond
        address: "Elrond's House",
        city: "Rivendell",
        state: "Eriador",
        country: "Middle Earth",
        lat: -35.1027,
        lng: 173.8255,
        name: "Elrond's Sanctuary",
        description: "A luxurious sanctuary in Rivendell. Perfect for a peaceful and relaxing stay.",
        price: 270.00,
      },
      // Wilderland
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
        ownerId: 17, // Thorin Oakenshield
        address: "Thorin's Hall",
        city: "Lonely Mountain",
        state: "Wilderland",
        country: "Middle Earth",
        lat: -36.9657,
        lng: 175.2339,
        name: "Thorin's Hall",
        description: "A majestic hall in Erebor. Experience the grandeur of the dwarven kingdom.",
        price: 320.00,
      },
      {
        ownerId: 18, // Dwalin
        address: "Dwalin's House",
        city: "Lonely Mountain",
        state: "Wilderland",
        country: "Middle Earth",
        lat: -36.9658,
        lng: 175.2340,
        name: "Dwalin's Fortress",
        description: "A fortress in Erebor. Perfect for those seeking adventure and history.",
        price: 310.00,
      },
      {
        ownerId: 19, // Balin
        address: "Balin's House",
        city: "Lonely Mountain",
        state: "Wilderland",
        country: "Middle Earth",
        lat: -36.9659,
        lng: 175.2341,
        name: "Balin's Mansion",
        description: "A grand mansion in Erebor. Experience the luxury and history of the dwarven kingdom.",
        price: 330.00,
      },
      {
        ownerId: 20, // Fili
        address: "Fili's House",
        city: "Lonely Mountain",
        state: "Wilderland",
        country: "Middle Earth",
        lat: -36.9660,
        lng: 175.2342,
        name: "Fili's Palace",
        description: "A palace in Erebor. Perfect for those seeking luxury and adventure.",
        price: 340.00,
      },
      // Rhovanion
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
        ownerId: 21, // Celeborn
        address: "Celeborn's Treehouse",
        city: "Lothlorien",
        state: "Rhovanion",
        country: "Middle Earth",
        lat: -37.1235,
        lng: 175.4568,
        name: "Celeborn's Treehouse",
        description: "A beautiful treehouse in Lothlorien. Enjoy the tranquility and beauty of the golden woods.",
        price: 210.00,
      },
      {
        ownerId: 22, // Haldir
        address: "Haldir's Treehouse",
        city: "Lothlorien",
        state: "Rhovanion",
        country: "Middle Earth",
        lat: -37.1236,
        lng: 175.4569,
        name: "Haldir's Treehouse",
        description: "A serene treehouse in Lothlorien. Perfect for those seeking peace and nature.",
        price: 220.00,
      },
      {
        ownerId: 23, // Thranduil
        address: "Thranduil's Palace",
        city: "Mirkwood",
        state: "Rhovanion",
        country: "Middle Earth",
        lat: -37.1237,
        lng: 175.4570,
        name: "Thranduil's Palace",
        description: "A grand palace in Mirkwood. Experience the luxury and beauty of the elven kingdom.",
        price: 230.00,
      },
      {
        ownerId: 8, // Galadriel
        address: "Galadriel's House",
        city: "Lothlorien",
        state: "Rhovanion",
        country: "Middle Earth",
        lat: -37.1238,
        lng: 175.4571,
        name: "Galadriel's House",
        description: "A beautiful house in Lothlorien. Enjoy the elven hospitality and the stunning views.",
        price: 240.00,
      },
      // Gondor
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
      },
      {
        ownerId: 1, // Frodo Baggins
        address: "Frodo's House",
        city: "Minas Tirith",
        state: "Gondor",
        country: "Middle Earth",
        lat: -36.8486,
        lng: 174.7634,
        name: "Frodo's House",
        description: "A lovely house in Minas Tirith. Enjoy the luxury and comfort of the White City.",
        price: 360.00,
      },
      {
        ownerId: 2, // Samwise Gamgee
        address: "Sam's House",
        city: "Minas Tirith",
        state: "Gondor",
        country: "Middle Earth",
        lat: -36.8487,
        lng: 174.7635,
        name: "Sam's House",
        description: "A cozy house in Minas Tirith. Perfect for those seeking peace and tranquility.",
        price: 370.00,
      },
      {
        ownerId: 3, // Aragorn
        address: "Aragorn's Palace",
        city: "Minas Tirith",
        state: "Gondor",
        country: "Middle Earth",
        lat: -36.8488,
        lng: 174.7636,
        name: "Aragorn's Palace",
        description: "A grand palace in Minas Tirith. Experience the luxury and majesty of the White City.",
        price: 380.00,
      },
      {
        ownerId: 7, // Boromir
        address: "Boromir's House",
        city: "Minas Tirith",
        state: "Gondor",
        country: "Middle Earth",
        lat: -36.8489,
        lng: 174.7637,
        name: "Boromir's House",
        description: "A beautiful house in Minas Tirith. Enjoy the luxury and comfort of the White City.",
        price: 390.00,
      },
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { 
        [Op.in]: [
          "Bag End", "Sam's Garden Cottage", "Bilbo's Hobbit Hole", "Brandy Hall", "Took Mansion", 
          "Rivendell Retreat", "Glorfindel's Haven", "Elrohir's Lodge", "Elladan's Retreat", "Elrond's Sanctuary", 
          "Erebor's Majesty", "Thorin's Hall", "Dwalin's Fortress", "Balin's Mansion", "Fili's Palace", 
          "Golden Wood Haven", "Celeborn's Treehouse", "Haldir's Treehouse", "Thranduil's Palace", "Galadriel's House", 
          "Citadel Suite", "Frodo's House", "Sam's House", "Aragorn's Palace", "Boromir's House"
        ]
      }
    }, {});
  }
};
