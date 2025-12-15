// ⭐ 第一行：先加载 dotenv
require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middleware/error')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
