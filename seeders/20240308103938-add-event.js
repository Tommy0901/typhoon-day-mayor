'use strict'
const data = require('../config/initial/event')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null)
  }
}
