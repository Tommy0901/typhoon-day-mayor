'use strict'
const data = require('../config/initial/ending')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Endings', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Endings', null)
  }
}
