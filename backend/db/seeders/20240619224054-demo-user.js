'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in options object if needed
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Frodo',
        lastName: 'Baggins',
        email: 'frodo@shire.com',
        username: 'RingBearer',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Samwise',
        lastName: 'Gamgee',
        email: 'samwise@shire.com',
        username: 'SamTheMan',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Aragorn',
        lastName: 'Elessar',
        email: 'aragorn@gondor.com',
        username: 'Strider',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Legolas',
        lastName: 'Greenleaf',
        email: 'legolas@woodland.com',
        username: 'ElvenPrince',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Gimli',
        lastName: 'son of Gloin',
        email: 'gimli@erebor.com',
        username: 'DwarfWarrior',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Gandalf',
        lastName: 'the Grey',
        email: 'gandalf@middleearth.com',
        username: 'Wizard',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Boromir',
        lastName: 'Son of Denethor',
        email: 'boromir@gondor.com',
        username: 'CaptainOfGondor',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Galadriel',
        lastName: 'Lady of Light',
        email: 'galadriel@lorien.com',
        username: 'LadyGaladriel',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Elrond',
        lastName: 'Half-elven',
        email: 'elrond@rivendell.com',
        username: 'Elrond',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Eowyn',
        lastName: 'of Rohan',
        email: 'eowyn@rohan.com',
        username: 'Shieldmaiden',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { 
        [Op.in]: [
          'RingBearer', 'Sam', 'Strider', 'ElvenPrince', 
          'DwarfWarrior', 'Wizard', 'CaptainOfGondor', 
          'LadyGaladriel', 'Elrond', 'Shieldmaiden'
        ] 
      }
    }, {});
  }
};
