"use strict";

const { Booking } = require("../models"); // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 3, // Aragorn
          startDate: new Date("2024-07-01"),
          endDate: new Date("2024-07-10"),
        },
        {
          spotId: 1,
          userId: 4, // Legolas
          startDate: new Date("2024-12-01"),
          endDate: new Date("2024-12-05"),
        },
        {
          spotId: 2,
          userId: 1, // Frodo Baggins
          startDate: new Date("2024-08-15"),
          endDate: new Date("2024-08-20"),
        },
        {
          spotId: 2,
          userId: 2, // Samwise Gamgee
          startDate: new Date("2024-07-11"),
          endDate: new Date("2024-07-15"),
        },
        {
          spotId: 3,
          userId: 5, // Gimli
          startDate: new Date("2024-09-05"),
          endDate: new Date("2024-09-15"),
        },
        {
          spotId: 3,
          userId: 6, // Gandalf
          startDate: new Date("2024-08-01"),
          endDate: new Date("2024-08-07"),
        },
        {
          spotId: 4,
          userId: 7, // Boromir
          startDate: new Date("2024-10-01"),
          endDate: new Date("2024-10-10"),
        },
        {
          spotId: 4,
          userId: 8, // Galadriel
          startDate: new Date("2024-09-20"),
          endDate: new Date("2024-09-25"),
        },
        {
          spotId: 5,
          userId: 1, // Frodo Baggins
          startDate: new Date("2024-11-12"),
          endDate: new Date("2024-11-20"),
        },
        {
          spotId: 5,
          userId: 9, // Elrond
          startDate: new Date("2024-10-15"),
          endDate: new Date("2024-10-22"),
        },
      ],
      options,
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
        userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {},
    );
  },
};
