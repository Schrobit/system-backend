const authService = require('../services/auth.service')
const { success, fail } = require('../utils/response')

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.json(fail('参数不完整'))
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

