const authService = require('../services/auth.service')
const { success, fail } = require('../utils/response')
const svgCaptcha = require('svg-captcha')

// ✅ 提取一个小函数：校验验证码（新手也好读）
function checkCaptcha(req, inputCaptcha) {
  const saved = req.session.captcha
  const savedAt = req.session.captchaAt

  // 没拿过验证码
  if (!saved || !savedAt) return '请先获取验证码'

  // 过期（2分钟）
  if (Date.now() - savedAt > 2 * 60 * 1000) return '验证码已过期，请重新获取'

  // 不匹配（忽略大小写）
  if (!inputCaptcha || String(inputCaptcha).toLowerCase() !== String(saved).toLowerCase()) {
    return '验证码错误'
  }

  // ✅ 用过就清掉，防止重复使用
  req.session.captcha = null
  req.session.captchaAt = null

  return null
}

exports.captcha = (req, res) => {
  // 生成验证码
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0oO1ilI', // 避免易混淆字符
    noise: 2,
    color: true
  })

  // ✅ 把验证码答案存到 session（服务端保存）
  req.session.captcha = captcha.text
  req.session.captchaAt = Date.now()

  // ✅ 返回 SVG 图片
  res.type('svg')
  // 为了方便用 Postman 测试（开发模式可返回答案）
  if (process.env.CAPTCHA_DEBUG === 'true') {
    res.setHeader('X-Captcha-Text', captcha.text) // 仅开发用
  }
  res.send(captcha.data)
}

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.json(fail('参数不完整'))
    }

    // ✅ 校验验证码
    const captchaErr = checkCaptcha(req, req.body.captcha)
    if (captchaErr) {
      return res.json(fail(captchaErr))
    }

    const result = await authService.register(username, password)
    res.json(success(result))
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.json(fail('参数不完整'))
    }

    // ✅ 校验验证码
    const captchaErr = checkCaptcha(req, req.body.captcha)
    if (captchaErr) {
      return res.json(fail(captchaErr))
    }

    const result = await authService.login(username, password)
    res.json(success(result))
  } catch (err) {
    next(err)
  }
}

exports.me = (req, res) => {
  res.json({
    code: 0,
    data: req.user,
    message: 'success'
  })
}

