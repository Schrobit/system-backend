// ⭐ 第一行：先加载 dotenv
require('dotenv').config()

const express = require('express')
const session = require('express-session') 
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middleware/error')

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000 // session cookie 10分钟
    }
  })
)

app.use('/api', routes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
