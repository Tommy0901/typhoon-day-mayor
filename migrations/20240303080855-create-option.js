'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Options (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        comm_id INT NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255),
        polling INT NOT NULL,
        desc_p VARCHAR(255),
        funding INT NOT NULL,
        desc_f VARCHAR(255),
        environment INT NOT NULL,
        desc_e VARCHAR(255),
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT options_fk_char_id FOREIGN KEY (comm_id) REFERENCES Comments(id)
      )`
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Options`
    )
  }
}
