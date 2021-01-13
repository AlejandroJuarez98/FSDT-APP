'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('USERS', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      fullname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }),

    queryInterface.createTable('PRODUCTS', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE(12,4),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('PRODUCTS'),
    queryInterface.dropTable('USERS')
  }
};
