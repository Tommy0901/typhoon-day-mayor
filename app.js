const express = require('express')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3030

app.use(express.json(), routes)

app.listen(port, () => {
  console.info(`App is running on http://localhost:${port}`)
})
