"use strict";

const { Review } = require("../models"); // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        // Reviews for Bag End
        {
          spotId: 1,
          userId: 3, // Aragorn
          review:
            "Bag End was an incredible experience! The hobbit hole was cozy and charming. The countryside views were breathtaking. Highly recommended!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 4, // Legolas
          review:
            "A lovely and peaceful retreat. The gardens were beautiful and the hobbit-style home was delightful. Will definitely visit again.",
          stars: 4,
        },
        // Reviews for Sam's Garden Cottage
        {
          spotId: 2,
          userId: 1, // Frodo Baggins
          review:
            "A beautiful and serene place. The garden is simply wonderful. Sam's hospitality is unmatched. A perfect getaway for nature lovers.",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2, // Samwise Gamgee
          review:
            "An amazing stay at Sam's Garden Cottage! The flowers and plants were stunning, and the cottage itself was cozy and welcoming.",
          stars: 5,
        },
        // Reviews for Bilbo's Hobbit Hole
        {
          spotId: 3,
          userId: 5, // Gimli
          review:
            "A quaint and charming hobbit hole with a lot of history. The atmosphere was perfect for a relaxing vacation. Highly recommended!",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 6, // Gandalf
          review:
            "Bilbo's Hobbit Hole was a delightful experience. The cozy interior and peaceful surroundings made it a perfect retreat.",
          stars: 4,
        },
        // Reviews for Brandy Hall
        {
          spotId: 4,
          userId: 7, // Boromir
          review:
            "Brandy Hall was enchanting. The treehouse was beautiful and the golden woods were magical. A perfect escape from the hustle and bustle.",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 8, // Galadriel
          review:
            "An amazing stay in the heart of Lothlorien. The views were breathtaking and the elven hospitality was exceptional. Highly recommended.",
          stars: 5,
        },
        // Reviews for Took Mansion
        {
          spotId: 5,
          userId: 1, // Frodo Baggins
          review:
            "Took Mansion was grand and luxurious. The hospitality was top-notch, and the surroundings were beautiful. A perfect stay!",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 9, // Elrond
          review:
            "A grand stay at Took Mansion. The mansion was spacious and comfortable. The service was exceptional. Highly recommended!",
          stars: 5,
        },
        // Reviews for Rivendell Retreat
        {
          spotId: 6,
          userId: 3, // Aragorn
          review:
            "Rivendell Retreat was magical. The elven architecture and the serene environment made for an unforgettable stay. Perfect for a quiet getaway.",
          stars: 5,
        },
        {
          spotId: 6,
          userId: 4, // Legolas
          review:
            "Amazing stay in Rivendell! The hidden valley was stunning and the accommodations were top-notch. Highly recommended for nature lovers.",
          stars: 5,
        },
        // Reviews for Glorfindel's Haven
        {
          spotId: 7,
          userId: 5, // Gimli
          review:
            "Glorfindel's Haven was peaceful and beautiful. The elven architecture was stunning, and the surroundings were serene. A must-visit!",
          stars: 4,
        },
        {
          spotId: 7,
          userId: 6, // Gandalf
          review:
            "A tranquil stay at Glorfindel's Haven. The beauty of the place and the calm atmosphere made it a perfect retreat.",
          stars: 4,
        },
        // Reviews for Elrohir's Lodge
        {
          spotId: 8,
          userId: 7, // Boromir
          review:
            "Elrohir's Lodge was a serene retreat. The lodge was comfortable, and the surroundings were peaceful. Highly recommended!",
          stars: 5,
        },
        {
          spotId: 8,
          userId: 8, // Galadriel
          review:
            "A beautiful stay at Elrohir's Lodge. The lodge was cozy, and the views were stunning. A perfect escape from the busy life.",
          stars: 5,
        },
        // Reviews for Elladan's Retreat
        {
          spotId: 9,
          userId: 1, // Frodo Baggins
          review:
            "Elladan's Retreat was serene and beautiful. The elven design and the tranquil environment made it a perfect getaway.",
          stars: 5,
        },
        {
          spotId: 9,
          userId: 9, // Elrond
          review:
            "A peaceful stay at Elladan's Retreat. The surroundings were calming, and the retreat itself was luxurious. Highly recommended!",
          stars: 5,
        },
        // Reviews for Elrond's Sanctuary
        {
          spotId: 10,
          userId: 3, // Aragorn
          review:
            "Elrond's Sanctuary was a luxurious stay. The accommodations were top-notch, and the views were breathtaking. A royal experience!",
          stars: 5,
        },
        {
          spotId: 10,
          userId: 4, // Legolas
          review:
            "A grand stay at Elrond's Sanctuary. The place was beautiful, and the service was exceptional. Highly recommended!",
          stars: 5,
        },
        // Reviews for Erebor's Majesty
        {
          spotId: 11,
          userId: 5, // Gimli
          review:
            "Erebor's Majesty was an impressive stay. The grandeur of the dwarven kingdom was fascinating, and the history was rich. A must-visit!",
          stars: 4,
        },
        {
          spotId: 11,
          userId: 6, // Gandalf
          review:
            "A unique experience at Erebor's Majesty. The massive chambers and intricate carvings were awe-inspiring. Would visit again.",
          stars: 4,
        },
        // Reviews for Thorin's Hall
        {
          spotId: 12,
          userId: 7, // Boromir
          review:
            "Thorin's Hall was majestic. The grandeur of the dwarven architecture and the history made it a fascinating stay. Highly recommended!",
          stars: 5,
        },
        {
          spotId: 12,
          userId: 8, // Galadriel
          review:
            "A grand stay at Thorin's Hall. The place was impressive, and the service was exceptional. Highly recommended!",
          stars: 5,
        },
        // Reviews for Dwalin's Fortress
        {
          spotId: 13,
          userId: 1, // Frodo Baggins
          review:
            "Dwalin's Fortress was a unique experience. The fortress was grand, and the history was rich. A perfect stay for adventurers!",
          stars: 5,
        },
        {
          spotId: 13,
          userId: 9, // Elrond
          review:
            "A fascinating stay at Dwalin's Fortress. The history and the architecture were impressive. Highly recommended!",
          stars: 5,
        },
        // Reviews for Balin's Mansion
        {
          spotId: 14,
          userId: 3, // Aragorn
          review:
            "Balin's Mansion was grand and luxurious. The mansion was spacious, and the service was exceptional. A royal experience!",
          stars: 5,
        },
        {
          spotId: 14,
          userId: 4, // Legolas
          review:
            "A grand stay at Balin's Mansion. The mansion was beautiful, and the accommodations were luxurious. Highly recommended!",
          stars: 5,
        },
        // Reviews for Fili's Palace
        {
          spotId: 15,
          userId: 5, // Gimli
          review:
            "Fili's Palace was luxurious and grand. The palace was spacious, and the service was top-notch. A perfect stay!",
          stars: 4,
        },
        {
          spotId: 15,
          userId: 6, // Gandalf
          review:
            "A royal stay at Fili's Palace. The palace was beautiful, and the accommodations were luxurious. Highly recommended!",
          stars: 4,
        },
        // Reviews for Golden Wood Haven
        {
          spotId: 16,
          userId: 7, // Boromir
          review:
            "Golden Wood Haven was enchanting. The treehouse was beautiful, and the golden woods were magical. A perfect escape!",
          stars: 5,
        },
        {
          spotId: 16,
          userId: 8, // Galadriel
          review:
            "An amazing stay at Golden Wood Haven. The views were breathtaking, and the elven hospitality was exceptional. Highly recommended!",
          stars: 5,
        },
        // Reviews for Celeborn's Treehouse
        {
          spotId: 17,
          userId: 1, // Frodo Baggins
          review:
            "Celeborn's Treehouse was serene and beautiful. The treehouse was cozy, and the surroundings were peaceful. A perfect stay!",
          stars: 5,
        },
        {
          spotId: 17,
          userId: 9, // Elrond
          review:
            "A peaceful stay at Celeborn's Treehouse. The views were stunning, and the treehouse was beautiful. Highly recommended!",
          stars: 5,
        },
        // Reviews for Haldir's Treehouse
        {
          spotId: 18,
          userId: 3, // Aragorn
          review:
            "Haldir's Treehouse was enchanting. The treehouse was beautiful, and the surroundings were peaceful. A perfect retreat!",
          stars: 5,
        },
        {
          spotId: 18,
          userId: 4, // Legolas
          review:
            "A beautiful stay at Haldir's Treehouse. The treehouse was cozy, and the views were stunning. Highly recommended!",
          stars: 5,
        },
        // Reviews for Thranduil's Palace
        {
          spotId: 19,
          userId: 5, // Gimli
          review:
            "Thranduil's Palace was luxurious and grand. The palace was spacious, and the service was top-notch. A perfect stay!",
          stars: 4,
        },
        {
          spotId: 19,
          userId: 6, // Gandalf
          review:
            "A royal stay at Thranduil's Palace. The palace was beautiful, and the accommodations were luxurious. Highly recommended!",
          stars: 4,
        },
        // Reviews for Galadriel's House
        {
          spotId: 20,
          userId: 7, // Boromir
          review:
            "Galadriel's House was enchanting. The house was beautiful, and the golden woods were magical. A perfect escape!",
          stars: 5,
        },
        {
          spotId: 20,
          userId: 8, // Galadriel
          review:
            "An amazing stay at Galadriel's House. The views were breathtaking, and the elven hospitality was exceptional. Highly recommended!",
          stars: 5,
        },
        // Reviews for Citadel Suite
        {
          spotId: 21,
          userId: 1, // Frodo Baggins
          review:
            "Citadel Suite was grand and luxurious. The suite was spacious, and the views were stunning. A royal experience!",
          stars: 5,
        },
        {
          spotId: 21,
          userId: 9, // Elrond
          review:
            "A grand stay at Citadel Suite. The suite was beautiful, and the accommodations were luxurious. Highly recommended!",
          stars: 5,
        },
        // Reviews for Frodo's House
        {
          spotId: 22,
          userId: 3, // Aragorn
          review:
            "Frodo's House was cozy and charming. The house was beautiful, and the surroundings were peaceful. A perfect retreat!",
          stars: 5,
        },
        {
          spotId: 22,
          userId: 4, // Legolas
          review:
            "A beautiful stay at Frodo's House. The house was cozy, and the views were stunning. Highly recommended!",
          stars: 5,
        },
        // Reviews for Sam's House
        {
          spotId: 23,
          userId: 5, // Gimli
          review:
            "Sam's House was cozy and charming. The house was beautiful, and the surroundings were peaceful. A perfect retreat!",
          stars: 4,
        },
        {
          spotId: 23,
          userId: 6, // Gandalf
          review:
            "A beautiful stay at Sam's House. The house was cozy, and the views were stunning. Highly recommended!",
          stars: 4,
        },
        // Reviews for Aragorn's Palace
        {
          spotId: 24,
          userId: 7, // Boromir
          review:
            "Aragorn's Palace was grand and luxurious. The palace was spacious, and the service was exceptional. A royal experience!",
          stars: 5,
        },
        {
          spotId: 24,
          userId: 8, // Galadriel
          review:
            "A grand stay at Aragorn's Palace. The palace was beautiful, and the accommodations were luxurious. Highly recommended!",
          stars: 5,
        },
        // Reviews for Boromir's House
        {
          spotId: 25,
          userId: 1, // Frodo Baggins
          review:
            "Boromir's House was cozy and charming. The house was beautiful, and the surroundings were peaceful. A perfect retreat!",
          stars: 5,
        },
        {
          spotId: 25,
          userId: 9, // Elrond
          review:
            "A beautiful stay at Boromir's House. The house was cozy, and the views were stunning. Highly recommended!",
          stars: 5,
        },
      ],
      options,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, options);
  },
};
