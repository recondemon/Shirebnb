"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object if needed
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Frodo",
          lastName: "Baggins",
          email: "frodo@shire.com",
          username: "RingBearer",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          firstName: "Samwise",
          lastName: "Gamgee",
          email: "samwise@shire.com",
          username: "SamTheMan",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Aragorn",
          lastName: "Elessar",
          email: "aragorn@gondor.com",
          username: "Strider",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Legolas",
          lastName: "Greenleaf",
          email: "legolas@woodland.com",
          username: "ElvenPrince",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Gimli",
          lastName: "son of Gloin",
          email: "gimli@erebor.com",
          username: "DwarfWarrior",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          firstName: "Gandalf",
          lastName: "the Grey",
          email: "gandalf@middleearth.com",
          username: "Wizard",
          hashedPassword: bcrypt.hashSync("password6"),
        },
        {
          firstName: "Boromir",
          lastName: "Son of Denethor",
          email: "boromir@gondor.com",
          username: "CaptainOfGondor",
          hashedPassword: bcrypt.hashSync("password7"),
        },
        {
          firstName: "Galadriel",
          lastName: "Lady of Light",
          email: "galadriel@lorien.com",
          username: "LadyGaladriel",
          hashedPassword: bcrypt.hashSync("password8"),
        },
        {
          firstName: "Elrond",
          lastName: "Half-elven",
          email: "elrond@rivendell.com",
          username: "Elrond",
          hashedPassword: bcrypt.hashSync("password9"),
        },
        {
          firstName: "Eowyn",
          lastName: "of Rohan",
          email: "eowyn@rohan.com",
          username: "Shieldmaiden",
          hashedPassword: bcrypt.hashSync("password10"),
        },
        {
          firstName: "Bilbo",
          lastName: "Baggins",
          email: "bilbo@shire.com",
          username: "Bilbo",
          hashedPassword: bcrypt.hashSync("password11"),
        },
        {
          firstName: "Merry",
          lastName: "Brandybuck",
          email: "merry@buckland.com",
          username: "Merry",
          hashedPassword: bcrypt.hashSync("password12"),
        },
        {
          firstName: "Pippin",
          lastName: "Took",
          email: "pippin@tuckborough.com",
          username: "Pippin",
          hashedPassword: bcrypt.hashSync("password13"),
        },
        {
          firstName: "Glorfindel",
          lastName: "of Rivendell",
          email: "glorfindel@rivendell.com",
          username: "Glorfindel",
          hashedPassword: bcrypt.hashSync("password14"),
        },
        {
          firstName: "Elrohir",
          lastName: "of Rivendell",
          email: "elrohir@rivendell.com",
          username: "Elrohir",
          hashedPassword: bcrypt.hashSync("password15"),
        },
        {
          firstName: "Elladan",
          lastName: "of Rivendell",
          email: "elladan@rivendell.com",
          username: "Elladan",
          hashedPassword: bcrypt.hashSync("password16"),
        },
        {
          firstName: "Thorin",
          lastName: "Oakenshield",
          email: "thorin@erebor.com",
          username: "Thorin",
          hashedPassword: bcrypt.hashSync("password17"),
        },
        {
          firstName: "Dwalin",
          lastName: "of Erebor",
          email: "dwalin@erebor.com",
          username: "Dwalin",
          hashedPassword: bcrypt.hashSync("password18"),
        },
        {
          firstName: "Balin",
          lastName: "of Erebor",
          email: "balin@erebor.com",
          username: "Balin",
          hashedPassword: bcrypt.hashSync("password19"),
        },
        {
          firstName: "Fili",
          lastName: "of Erebor",
          email: "fili@erebor.com",
          username: "Fili",
          hashedPassword: bcrypt.hashSync("password20"),
        },
        {
          firstName: "Celeborn",
          lastName: "of Lothlorien",
          email: "celeborn@lorien.com",
          username: "Celeborn",
          hashedPassword: bcrypt.hashSync("password21"),
        },
        {
          firstName: "Haldir",
          lastName: "of Lothlorien",
          email: "haldir@lorien.com",
          username: "Haldir",
          hashedPassword: bcrypt.hashSync("password22"),
        },
        {
          firstName: "Thranduil",
          lastName: "of Mirkwood",
          email: "thranduil@mirkwood.com",
          username: "Thranduil",
          hashedPassword: bcrypt.hashSync("password23"),
        },
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo@user.io",
          username: "DemoUser",
          hashedPassword: bcrypt.hashSync("demopassword"),
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "RingBearer",
            "SamTheMan",
            "Strider",
            "ElvenPrince",
            "DwarfWarrior",
            "Wizard",
            "CaptainOfGondor",
            "LadyGaladriel",
            "Elrond",
            "Shieldmaiden",
            "Bilbo",
            "Merry",
            "Pippin",
            "Glorfindel",
            "Elrohir",
            "Elladan",
            "Thorin",
            "Dwalin",
            "Balin",
            "Fili",
            "Celeborn",
            "Haldir",
            "Thranduil",
          ],
        },
      },
      {},
    );
  },
};
