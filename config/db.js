/**
 * 数据库连接配置
 * 使用 mysql2 的 promise 版本
 */


const mysql = require('mysql2/promise')

// 创建连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // 数据库地址
  user: process.env.DB_USER,        // 用户名
  password: process.env.DB_PASSWORD,// 密码
  database: process.env.DB_NAME,    // 数据库名

  waitForConnections: true,         // 连接满了是否等待
  connectionLimit: 10,              // 最大连接数
  queueLimit: 0                     // 排队请求数（0 = 不限）
})

/**
 * 测试数据库是否连接成功
 * 项目启动时就能发现问题
 */
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connected')
    conn.release()
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err)
  })

module.exports = pool
