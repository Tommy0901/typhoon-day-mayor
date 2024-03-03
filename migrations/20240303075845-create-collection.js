'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Collections (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        char_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT collections_fk_character_id FOREIGN KEY (char_id) REFERENCES Characters(id),
        CONSTRAINT collections_fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id)
      )`
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Collections`
    )
  }
}
