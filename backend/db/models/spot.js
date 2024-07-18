'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Spot extends Model {
		
		static associate(models) {
			
			Spot.belongsTo(
				models.User,
				{
					foreignKey: 'ownerId',
					as: 'Owner',
				},
				
			);
	
			Spot.hasMany(
				models.Booking,
				{
					foreignKey: 'spotId',
					onDelete: 'CASCADE',
				},
	
			);
		
			Spot.hasMany(
				models.SpotImage,
				{
					foreignKey: 'spotId',
					onDelete: 'CASCADE',
				},
			
			);
			
			Spot.hasMany(
				models.Review,
				{
					foreignKey: 'spotId',
					onDelete: 'CASCADE',
				},
			
			);
		}
	}
	Spot.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
				},
				references: { model: 'Users' },
			},
			address: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [10, 255],
				},
			},
			city: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [1, 100],
				},
			},
			state: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [1, 50],
				},
			},
			country: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [1, 100],
				},
			},
			lat: {
				type: DataTypes.DECIMAL,
				allowNull: true,
				validate: {
					isDecimal: true,
					min: -90,
					max: 90,
				},
			},
			lng: {
				type: DataTypes.DECIMAL,
				allowNull: true,
				validate: {
					isDecimal: true,
					min: -180,
					max: 180,
				},
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [1, 100],
				},
			},
			description: {
				type: DataTypes.STRING(1000),
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [10, 1000],
				},
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Spot',
		}
	);
	return Spot;
};