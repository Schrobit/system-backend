const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.routes')

// 所有 auth 相关接口统一 /api/auth
router.use('/auth', authRoutes)

module.exports = router
