'use strict'
const data = require('../config/initial/characters')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Characters', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null)
  }
}
