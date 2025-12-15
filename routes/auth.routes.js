const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

// 注册（不需要登录）
router.post('/register', authController.register)

// 登录（不需要登录）
router.post('/login', authController.login)

// 获取当前登录用户信息（需要登录）
router.get('/me', auth, authController.me)

// 获取验证码（不需要登录）
router.get('/captcha', authController.captcha)

module.exports = router
