const db = require('../config/db')

exports.findByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM user WHERE username = ?',
    [username]
  )
  return rows[0]
}

exports.findById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, username, created_at FROM user WHERE id = ?',
    [id]
  )
  return rows[0]
}

exports.createUser = async (username, passwordHash) => {
  const [result] = await db.query(
    'INSERT INTO user (username, password_hash) VALUES (?, ?)',
    [username, passwordHash]
  )
  return { id: result.insertId, username }
}
