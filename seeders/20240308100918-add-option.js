'use strict'
const data = require('../config/initial/options')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Options', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Options', null)
  }
}
