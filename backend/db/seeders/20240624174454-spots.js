"use strict";

const { Spot } = require("../models"); // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
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
          description:
            "A cozy hobbit hole nestled in the hills of Hobbiton, Bag End offers an authentic Shire experience. With its charming circular doors and windows, you'll feel like you've stepped into a storybook. The lush gardens surrounding the hobbit hole are meticulously maintained and offer a peaceful retreat where you can relax and enjoy the beauty of the countryside. Inside, the hobbit hole is filled with warm, rustic decor and all the comforts of home, including a fully equipped kitchen, a cozy living area with a fireplace, and comfortable bedrooms. Ideal for a relaxing getaway, Bag End promises tranquility and charm.",
          price: 150.0,
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
          description:
            "Located just a short walk from Bag End, Sam's Garden Cottage is a delightful escape for nature lovers. The cottage is surrounded by a stunning array of flowers and plants, lovingly tended by Samwise Gamgee himself. The garden is a feast for the senses, with vibrant colors and sweet fragrances filling the air. The cottage itself is quaint and cozy, featuring a charming interior with wooden beams and hobbit-sized furnishings. Guests can enjoy the peaceful garden views from every window and relax on the patio with a good book. Perfect for those who love gardening and nature, Sam's Garden Cottage is a serene haven in the heart of Hobbiton.",
          price: 140.0,
        },
        {
          ownerId: 11, // Bilbo Baggins
          address: "1 Bag End",
          city: "Hobbiton",
          state: "The Shire",
          country: "Middle Earth",
          lat: -37.8724,
          lng: 175.683,
          name: "Bilbo's Hobbit Hole",
          description:
            "Step into the world of adventure and history at Bilbo's Hobbit Hole. This charming hobbit hole is filled with rich history and tales of journeys far and wide. The cozy interior features warm wooden finishes, a crackling fireplace, and an extensive library filled with maps and books. Guests can enjoy the peaceful surroundings and the cozy atmosphere, with beautiful views of the rolling hills of Hobbiton. The hobbit hole is equipped with all modern conveniences while maintaining its rustic charm. Perfect for those who appreciate history and storytelling, Bilbo's Hobbit Hole offers a unique and memorable stay.",
          price: 160.0,
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
          description:
            "Brandy Hall is a grand and spacious hobbit hole located in Buckland, perfect for large groups and family gatherings. The hall features multiple rooms, each with its own unique charm, and is surrounded by lush greenery and the scenic Brandywine River. Inside, guests will find a large dining area perfect for feasts and celebrations, a cozy sitting room with a fireplace, and comfortable bedrooms. The hall also has a rich history, with many tales of the Brandybucks' adventures. Ideal for those looking to explore the Shire and enjoy a large, comfortable space, Brandy Hall offers a welcoming and festive atmosphere.",
          price: 180.0,
        },
        {
          ownerId: 13, // Pippin Took
          address: "Tuckborough",
          city: "Tuckborough",
          state: "The Shire",
          country: "Middle Earth",
          lat: -37.873,
          lng: 175.682,
          name: "Took Mansion",
          description:
            "Experience the luxury and comfort of a large hobbit family home at Took Mansion in Tuckborough. This grand mansion features elegant furnishings, spacious rooms, and beautiful gardens. Guests can enjoy the luxurious living areas, including a grand dining hall, a cozy library, and multiple bedrooms with comfortable beds. The mansion is perfect for those looking to indulge in the finer things in life while still enjoying the rustic charm of the Shire. The surrounding area offers beautiful views and plenty of opportunities for exploration. Took Mansion is the ideal choice for a luxurious and memorable stay in the Shire.",
          price: 190.0,
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
          description:
            "Experience the serenity and beauty of Rivendell, the Last Homely House east of the Sea. Nestled in a lush valley, this elven sanctuary offers tranquility and breathtaking views. The retreat features elegant elven architecture, with graceful arches and intricate carvings. Guests can enjoy the peaceful surroundings, with waterfalls, gardens, and forested hills providing a stunning backdrop. The retreat offers luxurious accommodations, including comfortable bedrooms, a grand dining hall, and serene sitting areas. Perfect for a peaceful and relaxing stay, Rivendell Retreat promises an enchanting experience in the heart of Middle Earth.",
          price: 250.0,
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
          description:
            "Glorfindel's Haven is a peaceful retreat in the heart of Rivendell. The house features stunning elven architecture, with elegant designs and beautiful craftsmanship. The serene environment is perfect for those seeking tranquility and natural beauty. Guests can relax in the lush gardens, enjoy the soothing sounds of nearby waterfalls, and take in the breathtaking views of the valley. Inside, the house is elegantly furnished, with comfortable bedrooms, a cozy sitting area, and a dining hall. Glorfindel's Haven offers a unique blend of luxury and natural beauty, making it an ideal destination for a relaxing getaway.",
          price: 240.0,
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
          description:
            "Elrohir's Lodge is a cozy and inviting retreat located in Rivendell. The lodge offers a perfect blend of comfort and natural beauty, with stunning views of the surrounding valley and forest. Guests can enjoy the warm and welcoming atmosphere, with elegantly furnished bedrooms, a comfortable sitting area, and a dining hall. The lodge is surrounded by beautiful gardens and offers easy access to the many scenic trails and pathways in Rivendell. Ideal for those seeking a peaceful and relaxing stay, Elrohir's Lodge promises a memorable experience in the heart of Middle Earth.",
          price: 230.0,
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
          description:
            "Elladan's Retreat is a beautiful and serene haven located in Rivendell. The retreat features elegant elven architecture and stunning views of the valley and surrounding hills. Guests can relax in the luxurious accommodations, which include comfortable bedrooms, a grand dining hall, and a cozy sitting area. The retreat is surrounded by lush gardens and offers easy access to the many scenic trails and pathways in Rivendell. Perfect for those seeking a peaceful and relaxing stay, Elladan's Retreat offers a unique blend of luxury and natural beauty, making it an ideal destination in Middle Earth.",
          price: 260.0,
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
          description:
            "Elrond's Sanctuary is a luxurious and tranquil retreat located in the heart of Rivendell. The sanctuary features elegant elven architecture, with graceful designs and beautiful craftsmanship. Guests can enjoy the peaceful surroundings, with stunning views of the valley, waterfalls, and gardens. The sanctuary offers luxurious accommodations, including spacious bedrooms, a grand dining hall, and serene sitting areas. Ideal for a peaceful and relaxing stay, Elrond's Sanctuary promises an enchanting experience in the heart of Middle Earth, where guests can unwind and reconnect with nature.",
          price: 270.0,
        },

        //Wilderland
        {
          ownerId: 5, // Gimli
          address: "Desolation of Smaug",
          city: "Lonely Mountain",
          state: "Wilderland",
          country: "Middle Earth",
          lat: -36.9656,
          lng: 175.2338,
          name: "Erebor's Majesty",
          description:
            "Erebor's Majesty invites you to stay within the legendary halls of Erebor, the Lonely Mountain. This majestic retreat is steeped in the rich history and grandeur of the dwarven kingdom. Marvel at the massive chambers adorned with intricate stone carvings that tell the tales of ancient heroes and epic battles. Each room is designed to immerse you in the majestic ambiance of dwarven architecture, with grand pillars and high ceilings that echo the glory of Erebor's past. Perfect for adventurers and history enthusiasts, this stay promises an unforgettable experience of Middle Earth's storied past.",
          price: 300.0,
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
          description:
            "Thorin's Hall offers a majestic escape into the heart of Erebor. This hall, named after the legendary Thorin Oakenshield, is a testament to the splendor of the dwarven kingdom. Experience the grandeur of the ancient halls with their intricately carved stone walls and towering pillars. The ambiance is both regal and welcoming, reflecting the noble spirit of its namesake. Whether you're a history buff or simply seeking a luxurious getaway, Thorin's Hall provides a unique blend of comfort and historical magnificence.",
          price: 320.0,
        },
        {
          ownerId: 18, // Dwalin
          address: "Dwalin's House",
          city: "Lonely Mountain",
          state: "Wilderland",
          country: "Middle Earth",
          lat: -36.9658,
          lng: 175.234,
          name: "Dwalin's Fortress",
          description:
            "Dwalin's Fortress is perfect for those seeking both adventure and history. Situated within the ancient halls of Erebor, this fortress embodies the strength and resilience of the dwarven spirit. Explore the robustly designed chambers with their sturdy stonework and powerful carvings. Each corner of Dwalin's Fortress tells a story of bravery and perseverance, making it an ideal retreat for adventurers looking to immerse themselves in the rich heritage of Middle Earth. Enjoy modern comforts amidst an atmosphere that echoes the valor of its past.",
          price: 310.0,
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
          description:
            "Balin's Mansion offers a grand and luxurious experience within the ancient kingdom of Erebor. This majestic mansion is a blend of opulence and historical significance, with elegantly carved stone walls and spacious chambers. The mansion's sophisticated design reflects the noble lineage of its owner, Balin. Guests can enjoy the comfort of modern amenities while being surrounded by the historical beauty of dwarven craftsmanship. Balin's Mansion is the perfect destination for those looking to experience the luxury and history of the dwarven kingdom in Middle Earth.",
          price: 330.0,
        },
        {
          ownerId: 20, // Fili
          address: "Fili's House",
          city: "Lonely Mountain",
          state: "Wilderland",
          country: "Middle Earth",
          lat: -36.966,
          lng: 175.2342,
          name: "Fili's Palace",
          description:
            "Fili's Palace is a lavish retreat nestled within the storied halls of Erebor. This palace combines the allure of luxury with the thrill of adventure, making it an ideal spot for those seeking both. The elegantly designed stone walls and grandiose chambers are adorned with intricate carvings that reflect the rich history of the dwarven kingdom. With modern comforts seamlessly integrated into the majestic surroundings, Fili's Palace offers an unparalleled experience of grandeur and adventure in Middle Earth.",
          price: 340.0,
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
          description:
            "Golden Wood Haven offers a serene escape amidst the enchanting golden leaves of Lothlorien. This exquisite elven treehouse, designed by the Lady Galadriel herself, combines the natural beauty of the forest with unparalleled comfort. Set high among the ancient trees, the treehouse provides stunning panoramic views of the surrounding forest, creating an atmosphere of tranquility and peace. Each room is carefully crafted to blend seamlessly with nature, featuring elegant elven designs and luxurious furnishings. Whether you seek solitude, inspiration, or simply a unique retreat, Golden Wood Haven promises an unforgettable experience.",
          price: 200.0,
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
          description:
            "Nestled in the heart of the golden woods of Lothlorien, Celeborn's Treehouse offers a sanctuary of beauty and peace. This enchanting treehouse, crafted with the wisdom and grace of the Elven Lord Celeborn, is a testament to the harmony between nature and elven architecture. The treehouse features expansive living spaces adorned with delicate carvings and natural wood elements, providing a cozy yet grand ambiance. Large windows and balconies offer breathtaking views of the forest, making it an ideal spot for reflection and relaxation. Immerse yourself in the tranquility of Lothlorien and experience the timeless elegance of elven hospitality.",
          price: 210.0,
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
          description:
            "Perched among the ancient trees of Lothlorien, Haldir's Treehouse offers a serene retreat for those seeking peace and connection with nature. This beautifully crafted treehouse, designed by the elven warrior Haldir, blends rustic charm with elegant elven craftsmanship. The interiors are spacious and filled with natural light, featuring comfortable furnishings and exquisite decor. The large deck provides a perfect vantage point to admire the golden canopy and listen to the soothing sounds of the forest. Whether you are a nature lover, an adventurer, or simply in need of a quiet escape, Haldir's Treehouse offers a unique and tranquil haven.",
          price: 220.0,
        },
        {
          ownerId: 23, // Thranduil
          address: "Thranduil's Palace",
          city: "Mirkwood",
          state: "Rhovanion",
          country: "Middle Earth",
          lat: -37.1237,
          lng: 175.457,
          name: "Thranduil's Palace",
          description:
            "Experience the grandeur of the elven kingdom at Thranduil's Palace, a magnificent residence nestled in the depths of Mirkwood. This grand palace, home to the Elvenking Thranduil, is a marvel of elven architecture, combining luxurious living with the natural beauty of the forest. The palace features expansive halls, intricately carved stone walls, and elegant furnishings that reflect the opulence and majesty of the elven realm. Guests can explore the lush gardens, relax in the grand living spaces, and enjoy the unparalleled hospitality of the elven kingdom. Thranduil's Palace offers a royal experience, perfect for those seeking luxury and beauty.",
          price: 230.0,
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
          description:
            "Galadriel's House is a stunning elven residence located in the heart of Lothlorien, offering guests a unique opportunity to experience the hospitality and beauty of the elven realm. Designed by the Lady Galadriel, this house features elegant elven architecture, with flowing lines, delicate carvings, and large windows that frame the breathtaking views of the golden forest. The interiors are luxurious and inviting, with comfortable furnishings and exquisite decor that reflect the grace and wisdom of Galadriel. Guests can enjoy peaceful walks in the surrounding woods, relax in the beautifully landscaped gardens, and savor the tranquility of this enchanting retreat.",
          price: 240.0,
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
          description:
            "Stay in the majestic city of Minas Tirith, the White City of Gondor, at the luxurious Citadel Suite. This opulent suite offers unparalleled views of the rolling plains of Gondor and the distant mountains, providing a regal experience for guests. The suite is elegantly furnished with rich fabrics, fine woodwork, and intricate details that reflect the grandeur of the city. Guests can enjoy the spacious living areas, relax in the luxurious bedroom, and take in the stunning vistas from the private balcony. Whether you are visiting for leisure or seeking a royal experience, the Citadel Suite promises a memorable stay in one of Middle Earth's most iconic cities.",
          price: 350.0,
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
          description:
            "Frodo's House in Minas Tirith offers a charming and comfortable retreat in the heart of the White City. This lovely house, inspired by the home of the famous hobbit Frodo Baggins, combines cozy hobbit-style living with the elegance of Minas Tirith. The house features a welcoming living room, a well-equipped kitchen, and a comfortable bedroom, all adorned with hobbit-inspired decor and luxurious furnishings. Guests can relax in the private garden, enjoy the scenic views of the city, and experience the warmth and hospitality of Minas Tirith. Frodo's House is the perfect choice for those seeking a blend of comfort, charm, and adventure.",
          price: 360.0,
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
          description:
            "Sam's House in Minas Tirith offers a cozy and tranquil retreat, perfect for those seeking peace and relaxation. Inspired by the home of Samwise Gamgee, this house combines the simplicity and warmth of hobbit living with the beauty of the White City. The interiors are inviting and comfortable, featuring a charming living room, a quaint kitchen, and a restful bedroom. Guests can enjoy the peaceful atmosphere of the private garden, take leisurely strolls through the city, and experience the serene ambiance of Minas Tirith. Sam's House is ideal for those looking to unwind and enjoy the tranquility of this historic city.",
          price: 370.0,
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
          description:
            "Experience the luxury and majesty of Minas Tirith at Aragorn's Palace, a grand residence in the heart of the White City. This magnificent palace, home to King Aragorn, is a marvel of architecture and design, reflecting the strength and nobility of Gondor. The palace features expansive halls, intricately carved stone walls, and elegant furnishings, providing a royal experience for guests. Guests can explore the lush gardens, relax in the opulent living spaces, and enjoy the stunning views of the city and the surrounding landscape. Aragorn's Palace offers a regal retreat, perfect for those seeking luxury and history in one of Middle Earth's most iconic cities.",
          price: 380.0,
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
          description:
            "Boromir's House in Minas Tirith offers a luxurious and comfortable retreat in the heart of Gondor's White City. This beautiful house, inspired by the home of the valiant warrior Boromir, combines elegance and comfort with the grandeur of Minas Tirith. The house features spacious living areas, a well-appointed kitchen, and a comfortable bedroom, all adorned with rich fabrics and fine furnishings. Guests can relax in the private courtyard, enjoy the scenic views of the city, and experience the warmth and hospitality of Minas Tirith. Boromir's House is the perfect choice for those seeking luxury and comfort in one of Middle Earth's most historic cities.",
          price: 390.0,
        },
      ],
      options,
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Bag End",
            "Sam's Garden Cottage",
            "Bilbo's Hobbit Hole",
            "Brandy Hall",
            "Took Mansion",
            "Rivendell Retreat",
            "Glorfindel's Haven",
            "Elrohir's Lodge",
            "Elladan's Retreat",
            "Elrond's Sanctuary",
            "Erebor's Majesty",
            "Thorin's Hall",
            "Dwalin's Fortress",
            "Balin's Mansion",
            "Fili's Palace",
            "Golden Wood Haven",
            "Celeborn's Treehouse",
            "Haldir's Treehouse",
            "Thranduil's Palace",
            "Galadriel's House",
            "Citadel Suite",
            "Frodo's House",
            "Sam's House",
            "Aragorn's Palace",
            "Boromir's House",
          ],
        },
      },
      {},
    );
  },
};
