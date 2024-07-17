// backend/db/seeders/20220101010102-demo-spot-images.js

'use strict';

const { SpotImage } = require('../models');  // Adjust the path if necessary

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in options object if needed
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      // The Shire - Bag End
      {
        spotId: 1,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/Bag+End/BagEnd1.png",
        preview: true
      },
      {
        spotId: 1,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/Bag+End/BagEnd2.png",
        preview: false
      },
      {
        spotId: 1,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/Bag+End/BagEnd3.png",
        preview: false
      },
      {
        spotId: 1,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/Bag+End/BagEnd4.png",
        preview: false
      },
      {
        spotId: 1,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/Bag+End/BagEnd5.png",
        preview: false
      },
      // The Shire - Sam's Garden Cottage
      {
        spotId: 2,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/SamsGardenCottage/SamsGardenCottage1.png",
        preview: true
      },
      {
        spotId: 2,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/SamsGardenCottage/SamsGardenCottage2.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/SamsGardenCottage/SamsGardenCottage3.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/SamsGardenCottage/SamsGardenCottage4.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/SamsGardenCottage/SamsGardenCottage5.png",
        preview: false
      },
      // The Shire - Bilbo's Hobbit Hole
      {
        spotId: 3,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BilbosHobbitHole/BilbosHobbitHole1.png",
        preview: true
      },
      {
        spotId: 3,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BilbosHobbitHole/BilbosHobbitHole2.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BilbosHobbitHole/BilbosHobbitHole3.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BilbosHobbitHole/BilbosHobbitHole4.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BilbosHobbitHole/BilbosHobbitHole5.png",
        preview: false
      },
      // The Shire - Brandy Hall
      {
        spotId: 4,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BrandyHall/BrandyHall1.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BrandyHall/BrandyHall2.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BrandyHall/BrandyHall3.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BrandyHall/BrandyHall4.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/BrandyHall/BrandyHall5.png",
        preview: false
      },
      // The Shire - Took Mansion
      {
        spotId: 5,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/TookMansion/TookMansion1.png",
        preview: true
      },
      {
        spotId: 5,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/TookMansion/TookMansion2.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/TookMansion/TookMansion3.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/TookMansion/TookMansion4.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/TookMansion/TookMansion5.png",
        preview: false
      },
      // Eriador - Rivendell Retreat
      {
        spotId: 6,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/RivendellRetreat/RivendellRetreat1.png",
        preview: true
      },
      {
        spotId: 6,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/RivendellRetreat/RivendellRetreat2.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/RivendellRetreat/RivendellRetreat3.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/RivendellRetreat/RivendellRetreat4.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/RivendellRetreat/RivendellRetreat5.png",
        preview: false
      },
      // Eriador - Glorfindel's Haven
      {
        spotId: 7,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/GlorfindelsHaven/GlorfindelsHaven1.png",
        preview: true
      },
      {
        spotId: 7,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/GlorfindelsHaven/GlorfindelsHave2.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/GlorfindelsHaven/GlorfindelsHaven3.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/GlorfindelsHaven/GlorfindelsHave4.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/GlorfindelsHaven/GlorfindelsHaven5.png",
        preview: false
      },
      // Eriador - Elrohir's Lodge
      {
        spotId: 8,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrohirsLodge/ElrohirsLodge1.png",
        preview: true
      },
      {
        spotId: 8,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrohirsLodge/ElrohirsLodge2.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrohirsLodge/ElrohirsLodge3.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrohirsLodge/ElrohirsLodge4.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrohirsLodge/ElrohirsLodge5.png",
        preview: false
      },
      // Eriador - Elladan's Retreat
      {
        spotId: 9,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElladansRetreat/ElladansRetreat1.png",
        preview: true
      },
      {
        spotId: 9,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElladansRetreat/ElladansRetreat2.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElladansRetreat/ElladansRetreat3.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElladansRetreat/ElladansRetreat4.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElladansRetreat/ElladansRetreat5.png",
        preview: false
      },
      // Eriador - Elrond's Sanctuary
      {
        spotId: 10,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrondsSanctuary/ElrondsSanctuary1.png",
        preview: true
      },
      {
        spotId: 10,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrondsSanctuary/ElrondsSanctuary2.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrondsSanctuary/ElrondsSanctuary3.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrondsSanctuary/ElrondsSanctuary4.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://shirebnb.s3.us-east-2.amazonaws.com/ElrondsSanctuary/ElrondsSanctuary5.png",
        preview: false
      },
      // Wilderland - Erebor's Majesty
      {
        spotId: 11,
        url: "/Wilderland/EreborsMajesty/EreborsMajesty1.png",
        preview: true
      },
      {
        spotId: 11,
        url: "/Wilderland/EreborsMajesty/EreborsMajesty2.png",
        preview: false
      },
      {
        spotId: 11,
        url: "/Wilderland/EreborsMajesty/EreborsMajesty3.png",
        preview: false
      },
      {
        spotId: 11,
        url: "/Wilderland/EreborsMajesty/EreborsMajesty4.png",
        preview: false
      },
      {
        spotId: 11,
        url: "/Wilderland/EreborsMajesty/EreborsMajesty5.png",
        preview: false
      },
      // Wilderland - Thorin's Hall
      {
        spotId: 12,
        url: "/Wilderland/ThorinsHall/ThorinsHall1.png",
        preview: true
      },
      {
        spotId: 12,
        url: "/Wilderland/ThorinsHall/ThorinsHall2.png",
        preview: false
      },
      {
        spotId: 12,
        url: "/Wilderland/ThorinsHall/ThorinsHall3.png",
        preview: false
      },
      {
        spotId: 12,
        url: "/Wilderland/ThorinsHall/ThorinsHall4.png",
        preview: false
      },
      {
        spotId: 12,
        url: "/Wilderland/ThorinsHall/ThorinsHall5.png",
        preview: false
      },
      // Wilderland - Dwalin's Fortress
      {
        spotId: 13,
        url: "/Wilderland/DwalinsFortress/DwalinsFortress1.png",
        preview: true
      },
      {
        spotId: 13,
        url: "/Wilderland/DwalinsFortress/DwalinsFortress2.png",
        preview: false
      },
      {
        spotId: 13,
        url: "/Wilderland/DwalinsFortress/DwalinsFortress3.png",
        preview: false
      },
      {
        spotId: 13,
        url: "/Wilderland/DwalinsFortress/DwalinsFortress4.png",
        preview: false
      },
      {
        spotId: 13,
        url: "/Wilderland/DwalinsFortress/DwalinsFortress5.png",
        preview: false
      },
      // Wilderland - Balin's Mansion
      {
        spotId: 14,
        url: "/Wilderland/BalinsMansion/BalinsMansion1.png",
        preview: true
      },
      {
        spotId: 14,
        url: "/Wilderland/BalinsMansion/BalinsMansion2.png",
        preview: false
      },
      {
        spotId: 14,
        url: "/Wilderland/BalinsMansion/BalinsMansion3.png",
        preview: false
      },
      {
        spotId: 14,
        url: "/Wilderland/BalinsMansion/BalinsMansion4.png",
        preview: false
      },
      {
        spotId: 14,
        url: "/Wilderland/BalinsMansion/BalinsMansion5.png",
        preview: false
      },
      // Wilderland - Fili's Palace
      {
        spotId: 15,
        url: "/Wilderland/FilisPalace/FilisPalace1.png",
        preview: true
      },
      {
        spotId: 15,
        url: "/Wilderland/FilisPalace/FilisPalace2.png",
        preview: false
      },
      {
        spotId: 15,
        url: "/Wilderland/FilisPalace/FilisPalace3.png",
        preview: false
      },
      {
        spotId: 15,
        url: "/Wilderland/FilisPalace/FilisPalace4.png",
        preview: false
      },
      {
        spotId: 15,
        url: "/Wilderland/FilisPalace/FilisPalace5.png",
        preview: false
      },
      // Rhovanion - Golden Wood Haven
      {
        spotId: 16,
        url: "/Rhovanion/GoldenWoodHaven/GoldenWoodHaven1.png",
        preview: true
      },
      {
        spotId: 16,
        url: "/Rhovanion/GoldenWoodHaven/GoldenWoodHaven2.png",
        preview: false
      },
      {
        spotId: 16,
        url: "/Rhovanion/GoldenWoodHaven/GoldenWoodHaven3.png",
        preview: false
      },
      {
        spotId: 16,
        url: "/Rhovanion/GoldenWoodHaven/GoldenWoodHaven4.png",
        preview: false
      },
      {
        spotId: 16,
        url: "/Rhovanion/GoldenWoodHaven/GoldenWoodHaven5.png",
        preview: false
      },
      // Rhovanion - Celeborn's Treehouse
      {
        spotId: 17,
        url: "/Rhovanion/CelebornsTreehouse/CelebornsTreehouse1.png",
        preview: true
      },
      {
        spotId: 17,
        url: "/Rhovanion/CelebornsTreehouse/CelebornsTreehouse2.png",
        preview: false
      },
      {
        spotId: 17,
        url: "/Rhovanion/CelebornsTreehouse/CelebornsTreehouse3.png",
        preview: false
      },
      {
        spotId: 17,
        url: "/Rhovanion/CelebornsTreehouse/CelebornsTreehouse4.png",
        preview: false
      },
      {
        spotId: 17,
        url: "/Rhovanion/CelebornsTreehouse/CelebornsTreehouse5.png",
        preview: false
      },
      // Rhovanion - Haldir's Treehouse
      {
        spotId: 18,
        url: "/Rhovanion/HaldirsTreehouse/HaldirsTreehouse1.png",
        preview: true
      },
      {
        spotId: 18,
        url: "/Rhovanion/HaldirsTreehouse/HaldirsTreehouse2.png",
        preview: false
      },
      {
        spotId: 18,
        url: "/Rhovanion/HaldirsTreehouse/HaldirsTreehouse3.png",
        preview: false
      },
      {
        spotId: 18,
        url: "/Rhovanion/HaldirsTreehouse/HaldirsTreehouse4.png",
        preview: false
      },
      {
        spotId: 18,
        url: "/Rhovanion/HaldirsTreehouse/HaldirsTreehouse5.png",
        preview: false
      },
      // Rhovanion - Thranduil's Palace
      {
        spotId: 19,
        url: "/Rhovanion/ThranduilsPalace/ThranduilsPalace1.png",
        preview: true
      },
      {
        spotId: 19,
        url: "/Rhovanion/ThranduilsPalace/ThranduilsPalace2.png",
        preview: false
      },
      {
        spotId: 19,
        url: "/Rhovanion/ThranduilsPalace/ThranduilsPalace3.png",
        preview: false
      },
      {
        spotId: 19,
        url: "/Rhovanion/ThranduilsPalace/ThranduilsPalace4.png",
        preview: false
      },
      {
        spotId: 19,
        url: "/Rhovanion/ThranduilsPalace/ThranduilsPalace5.png",
        preview: false
      },
      // Rhovanion - Galadriel's House
      {
        spotId: 20,
        url: "/Rhovanion/GaladrielsHouse/GaladrielsHouse1.png",
        preview: true
      },
      {
        spotId: 20,
        url: "/Rhovanion/GaladrielsHouse/GaladrielsHouse2.png",
        preview: false
      },
      {
        spotId: 20,
        url: "/Rhovanion/GaladrielsHouse/GaladrielsHouse3.png",
        preview: false
      },
      {
        spotId: 20,
        url: "/Rhovanion/GaladrielsHouse/GaladrielsHouse4.png",
        preview: false
      },
      {
        spotId: 20,
        url: "/Rhovanion/GaladrielsHouse/GaladrielsHouse5.png",
        preview: false
      },
      // Gondor - Citadel Suite
      {
        spotId: 21,
        url: "/Gondor/CitadelSuite/CitadelSuite1.png",
        preview: true
      },
      {
        spotId: 21,
        url: "/Gondor/CitadelSuite/CitadelSuite2.png",
        preview: false
      },
      {
        spotId: 21,
        url: "/Gondor/CitadelSuite/CitadelSuite3.png",
        preview: false
      },
      {
        spotId: 21,
        url: "/Gondor/CitadelSuite/CitadelSuite4.png",
        preview: false
      },
      {
        spotId: 21,
        url: "/Gondor/CitadelSuite/CitadelSuite5.png",
        preview: false
      },
      // Gondor - Frodo's House
      {
        spotId: 22,
        url: "/Gondor/FrodosHouse/FrodosHouse1.png",
        preview: true
      },
      {
        spotId: 22,
        url: "/Gondor/FrodosHouse/FrodosHouse2.png",
        preview: false
      },
      {
        spotId: 22,
        url: "/Gondor/FrodosHouse/FrodosHouse3.png",
        preview: false
      },
      {
        spotId: 22,
        url: "/Gondor/FrodosHouse/FrodosHouse4.png",
        preview: false
      },
      {
        spotId: 22,
        url: "/Gondor/FrodosHouse/FrodosHouse5.png",
        preview: false
      },
      // Gondor - Sam's House
      {
        spotId: 23,
        url: "/Gondor/SamsHouse/SamsHouse1.png",
        preview: true
      },
      {
        spotId: 23,
        url: "/Gondor/SamsHouse/SamsHouse2.png",
        preview: false
      },
      {
        spotId: 23,
        url: "/Gondor/SamsHouse/SamsHouse3.png",
        preview: false
      },
      {
        spotId: 23,
        url: "/Gondor/SamsHouse/SamsHouse4.png",
        preview: false
      },
      {
        spotId: 23,
        url: "/Gondor/SamsHouse/SamsHouse5.png",
        preview: false
      },
      // Gondor - Aragorn's Palace
      {
        spotId: 24,
        url: "/Gondor/AragornsPalace/AragornsPalace1.png",
        preview: true
      },
      {
        spotId: 24,
        url: "/Gondor/AragornsPalace/AragornsPalace2.png",
        preview: false
      },
      {
        spotId: 24,
        url: "/Gondor/AragornsPalace/AragornsPalace3.png",
        preview: false
      },
      {
        spotId: 24,
        url: "/Gondor/AragornsPalace/AragornsPalace4.png",
        preview: false
      },
      {
        spotId: 24,
        url: "/Gondor/AragornsPalace/AragornsPalace5.png",
        preview: false
      },
      // Gondor - Boromir's House
      {
        spotId: 25,
        url: "/Gondor/BoromirsHouse/BoromirsHouse1.png",
        preview: true
      },
      {
        spotId: 25,
        url: "/Gondor/BoromirsHouse/BoromirsHouse2.png",
        preview: false
      },
      {
        spotId: 25,
        url: "/Gondor/BoromirsHouse/BoromirsHouse3.png",
        preview: false
      },
      {
        spotId: 25,
        url: "/Gondor/BoromirsHouse/BoromirsHouse4.png",
        preview: false
      },
      {
        spotId: 25,
        url: "/Gondor/BoromirsHouse/BoromirsHouse5.png",
        preview: false
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, options);
  }
};
