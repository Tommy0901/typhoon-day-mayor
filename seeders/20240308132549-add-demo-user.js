'use strict'
const bcrypt = require('bcryptjs')
const { User } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'demo-user',
      email: 'demo',
      password: await bcrypt.hash('123', 10)
    }])
    const { id: user_id } = await User.findOne({ where: { email: 'demo' }, raw: true })
    await queryInterface.bulkInsert('Collections', Array.from({ length: 8 }, (_, i) => ({
      char_id: i + 1,
      user_id
    })))
    await queryInterface.bulkInsert('unlockable_endings', Array.from({ length: 17 }, (_, i) => ({
      ending_id: i + 1,
      user_id
    })))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
    await queryInterface.bulkDelete('Collections', null)
    await queryInterface.bulkDelete('unlockable_endings', null)
  }
}
