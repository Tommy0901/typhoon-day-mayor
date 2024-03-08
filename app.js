const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const passport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3333

app.use(cors(), express.json(), passport.initialize(), routes)

app.listen(port, () => {
  console.info(`App is running on http://localhost:${port}`)
})
