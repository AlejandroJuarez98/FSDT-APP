'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('users', [
      {
        id: 1,
        fullname: "José Alejandro Juárez",
        email: "alejandrojuarezck@gmail.com",
        password: "$2b$10$Pz1ibY315xv0ARdSLbAJw.uVMNMf85D/W..0LBOeoNE/THVJlGCKm", // contra1231
        birthdate: "1998-01-21",
        state: 1
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
   queryInterface.bulkDelete('users')
  }
};
