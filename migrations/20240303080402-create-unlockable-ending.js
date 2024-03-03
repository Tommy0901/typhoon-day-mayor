'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS unlockable_endings (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        ending_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT unlockable_endings_fk_ending_id FOREIGN KEY (ending_id) REFERENCES Endings(id),
        CONSTRAINT unlockable_endings_fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id)
      )`
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS unlockable_endings`
    )
  }
}
