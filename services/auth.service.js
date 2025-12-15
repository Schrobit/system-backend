const bcrypt = require('bcrypt')
const userDao = require('../dao/user.dao')
const { signToken } = require('../utils/token')

/**
 * 注册
 */
exports.register = async (username, password) => {
  // 1. 判断用户是否存在
  const exist = await userDao.findByUsername(username)
  if (exist) throw new Error('用户名已存在')

  // 2. bcrypt 加密（自动加盐）
  const passwordHash = await bcrypt.hash(password, 10)

  // 3. 存数据库
  const user = await userDao.createUser(username, passwordHash)

  // 4. 生成 token
  const token = signToken({ userId: user.id })

  // 5. 打印日志
  console.log('注册成功', user)

  return { user, token }
}

/**
 * 登录
 */
exports.login = async (username, password) => {
  // 1. 查用户
  const user = await userDao.findByUsername(username)
  if (!user) throw new Error('用户名或密码错误')

  // 2. 比较密码（bcrypt 内部会用原来的 salt）
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) throw new Error('用户名或密码错误')

  // 3. 登录成功，发 token
  const token = signToken({ userId: user.id })

  // 4. 打印日志
  console.log('登录成功', user , 'token:', token)

  return {
    token,
    user: { id: user.id, username: user.username }
  }
}
