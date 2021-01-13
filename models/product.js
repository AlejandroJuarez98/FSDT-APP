'use strict'

module.exports = (sequelize, DataTypes) => {
	var Product = sequelize.define('PRODUCTS', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		sku: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		quantity: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: DataTypes.DATE,
		updateAt: DataTypes.DATE
	}, {
		freezeTableName: true
	})

	Product.associate = (models) => {

	}

  	return Product
}