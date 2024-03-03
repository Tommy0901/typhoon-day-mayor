// *** User Settings *** //

// Please modify "hostname", "user", "password" to match your MySQL server connection settings.
// You can also change the "database" name if it already exists.
// Don't forget to update the same settings in /config/config.json if you make any changes here.
const { username: user, password, database, host } = require('./config/config').development

// *** User Settings End *** //
const mysql = require('mysql2')

// Create connection
const connection = mysql.createConnection({ host, user, password })

// Connect to MySQL server
connection.connect(err => {
  if (err) throw err
  console.log('Connected to MySQL server.')

  // Create database
  connection.query('USE ' + database, (err, result) => {
    if (err) {
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${database}`,
        (err, result) => {
          if (err) throw err
          console.log('Database created.')
          process.exit()
        }
      )
    } else {
      console.log('Database already exists.')
      process.exit()
    }
  })
})
