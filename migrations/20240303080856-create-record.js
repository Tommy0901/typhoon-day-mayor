'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Records (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        option_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT records_fk_option_id FOREIGN KEY (option_id) REFERENCES Options(id),
        CONSTRAINT records_fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id)
      )`
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Records`
    )
  }
}
