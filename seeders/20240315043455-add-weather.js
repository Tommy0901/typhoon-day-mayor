'use strict'
const data = require('../config/initial/weathers')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Weather', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Weather', null)
  }
}
