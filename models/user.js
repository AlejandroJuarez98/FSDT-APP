'use strict'

module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('USERS', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		state: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		birthdate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		createdAt: DataTypes.DATE,
		updateAt: DataTypes.DATE
	}, {
	    freezeTableName: true
	})

	User.associate = (models) => {
    
  	}

	return User
}