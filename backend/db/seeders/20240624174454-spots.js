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
  description: "A cozy hobbit hole nestled in the hills of Hobbiton, Bag End offers an authentic Shire experience. With its charming circular doors and windows, you'll feel like you've stepped into a storybook. The lush gardens surrounding the hobbit hole are meticulously maintained and offer a peaceful retreat where you can relax and enjoy the beauty of the countryside. Inside, the hobbit hole is filled with warm, rustic decor and all the comforts of home, including a fully equipped kitchen, a cozy living area with a fireplace, and comfortable bedrooms. Ideal for a relaxing getaway, Bag End promises tranquility and charm.",
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
  description: "Located just a short walk from Bag End, Sam's Garden Cottage is a delightful escape for nature lovers. The cottage is surrounded by a stunning array of flowers and plants, lovingly tended by Samwise Gamgee himself. The garden is a feast for the senses, with vibrant colors and sweet fragrances filling the air. The cottage itself is quaint and cozy, featuring a charming interior with wooden beams and hobbit-sized furnishings. Guests can enjoy the peaceful garden views from every window and relax on the patio with a good book. Perfect for those who love gardening and nature, Sam's Garden Cottage is a serene haven in the heart of Hobbiton.",
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
  description: "Step into the world of adventure and history at Bilbo's Hobbit Hole. This charming hobbit hole is filled with rich history and tales of journeys far and wide. The cozy interior features warm wooden finishes, a crackling fireplace, and an extensive library filled with maps and books. Guests can enjoy the peaceful surroundings and the cozy atmosphere, with beautiful views of the rolling hills of Hobbiton. The hobbit hole is equipped with all modern conveniences while maintaining its rustic charm. Perfect for those who appreciate history and storytelling, Bilbo's Hobbit Hole offers a unique and memorable stay.",
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
  description: "Brandy Hall is a grand and spacious hobbit hole located in Buckland, perfect for large groups and family gatherings. The hall features multiple rooms, each with its own unique charm, and is surrounded by lush greenery and the scenic Brandywine River. Inside, guests will find a large dining area perfect for feasts and celebrations, a cozy sitting room with a fireplace, and comfortable bedrooms. The hall also has a rich history, with many tales of the Brandybucks' adventures. Ideal for those looking to explore the Shire and enjoy a large, comfortable space, Brandy Hall offers a welcoming and festive atmosphere.",
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
  description: "Experience the luxury and comfort of a large hobbit family home at Took Mansion in Tuckborough. This grand mansion features elegant furnishings, spacious rooms, and beautiful gardens. Guests can enjoy the luxurious living areas, including a grand dining hall, a cozy library, and multiple bedrooms with comfortable beds. The mansion is perfect for those looking to indulge in the finer things in life while still enjoying the rustic charm of the Shire. The surrounding area offers beautiful views and plenty of opportunities for exploration. Took Mansion is the ideal choice for a luxurious and memorable stay in the Shire.",
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
  description: "Experience the serenity and beauty of Rivendell, the Last Homely House east of the Sea. Nestled in a lush valley, this elven sanctuary offers tranquility and breathtaking views. The retreat features elegant elven architecture, with graceful arches and intricate carvings. Guests can enjoy the peaceful surroundings, with waterfalls, gardens, and forested hills providing a stunning backdrop. The retreat offers luxurious accommodations, including comfortable bedrooms, a grand dining hall, and serene sitting areas. Perfect for a peaceful and relaxing stay, Rivendell Retreat promises an enchanting experience in the heart of Middle Earth.",
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
  description: "Glorfindel's Haven is a peaceful retreat in the heart of Rivendell. The house features stunning elven architecture, with elegant designs and beautiful craftsmanship. The serene environment is perfect for those seeking tranquility and natural beauty. Guests can relax in the lush gardens, enjoy the soothing sounds of nearby waterfalls, and take in the breathtaking views of the valley. Inside, the house is elegantly furnished, with comfortable bedrooms, a cozy sitting area, and a dining hall. Glorfindel's Haven offers a unique blend of luxury and natural beauty, making it an ideal destination for a relaxing getaway.",
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
  description: "Elrohir's Lodge is a cozy and inviting retreat located in Rivendell. The lodge offers a perfect blend of comfort and natural beauty, with stunning views of the surrounding valley and forest. Guests can enjoy the warm and welcoming atmosphere, with elegantly furnished bedrooms, a comfortable sitting area, and a dining hall. The lodge is surrounded by beautiful gardens and offers easy access to the many scenic trails and pathways in Rivendell. Ideal for those seeking a peaceful and relaxing stay, Elrohir's Lodge promises a memorable experience in the heart of Middle Earth.",
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
  description: "Elladan's Retreat is a beautiful and serene haven located in Rivendell. The retreat features elegant elven architecture and stunning views of the valley and surrounding hills. Guests can relax in the luxurious accommodations, which include comfortable bedrooms, a grand dining hall, and a cozy sitting area. The retreat is surrounded by lush gardens and offers easy access to the many scenic trails and pathways in Rivendell. Perfect for those seeking a peaceful and relaxing stay, Elladan's Retreat offers a unique blend of luxury and natural beauty, making it an ideal destination in Middle Earth.",
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
  description: "Elrond's Sanctuary is a luxurious and tranquil retreat located in the heart of Rivendell. The sanctuary features elegant elven architecture, with graceful designs and beautiful craftsmanship. Guests can enjoy the peaceful surroundings, with stunning views of the valley, waterfalls, and gardens. The sanctuary offers luxurious accommodations, including spacious bedrooms, a grand dining hall, and serene sitting areas. Ideal for a peaceful and relaxing stay, Elrond's Sanctuary promises an enchanting experience in the heart of Middle Earth, where guests can unwind and reconnect with nature.",
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
