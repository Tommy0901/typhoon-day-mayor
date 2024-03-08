'use strict'
const data = require('../config/initial/comments')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null)
  }
}
