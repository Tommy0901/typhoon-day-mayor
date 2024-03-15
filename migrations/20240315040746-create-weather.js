'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Weather (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        年份 INT,
        颱風編號 INT,
        中文名稱 VARCHAR(255),
        英文名稱 VARCHAR(255),
        侵臺路徑分類 INT,
        警報開始 DATETIME,
        警報結束 DATETIME,
        近臺強度 VARCHAR(255),
        近臺最低氣壓_hPa INT,
        近臺最大風速_m_per_s INT,
        近臺7級風暴風半徑_km INT,
        近臺10級風暴風半徑_km INT,
        警報發布報數 INT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Weather`
    )
  }
}
