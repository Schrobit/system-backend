很好 👍
下面我给你一份**“刚好够用、但不幼稚、非常适合你当前项目阶段”**的 `README.md`。
这份 README 的目标是：

* 你 **3 个月后自己再看也能立刻上手**
* 别人 clone 你的项目 **不问你也能跑起来**
* 不追求花哨，只追求**清晰、真实、可维护**

---

## ✅ README.md（直接复制使用）

````md
# system-backend

一个基于 **Node.js + Express + MySQL** 的后端基础项目，  
实现了**用户注册、登录、JWT 鉴权**，采用 **DAO / Service / Controller** 分层结构，适合作为学习或项目起点。

---

## ✨ 功能简介

- 用户注册
- 用户登录
- JWT 登录鉴权
- 受保护接口示例（获取当前用户信息）
- 统一错误处理
- 基础日志输出（console）

---

## 🧱 技术栈

- Node.js
- Express
- MySQL
- mysql2（promise）
- bcrypt（密码加密，自动加盐）
- jsonwebtoken（JWT）
- dotenv（环境变量管理）

---

## 📁 项目结构

```text
.
├── app.js                  # 项目入口
├── routes/                 # 路由定义
│   ├── index.js
│   └── auth.routes.js
├── controllers/            # Controller 层（接收请求）
│   └── auth.controller.js
├── services/               # Service 层（业务逻辑）
│   └── auth.service.js
├── dao/                    # DAO 层（数据库访问）
│   └── user.dao.js
├── middleware/             # 中间件
│   ├── auth.js             # JWT 鉴权
│   └── error.js            # 统一错误处理
├── config/
│   └── db.js               # 数据库连接
├── utils/                  # 工具函数
│   ├── token.js            # JWT 工具
│   └── response.js         # 统一响应格式
├── logs/                   # 日志目录（当前未使用）
├── .env.example            # 环境变量示例
├── .gitignore
└── README.md
````

---

## 🚀 启动项目

### 1️⃣ 安装依赖

```bash
npm install
```

---

### 2️⃣ 配置环境变量

复制示例文件：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
PORT=3000
JWT_SECRET=your_jwt_secret

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

### 3️⃣ 创建数据库表

```sql
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4️⃣ 启动服务

```bash
node app.js
```

启动成功后：

```text
Server running on port 3000
```

---

## 🔐 接口说明

### 注册

```http
POST /api/auth/register
```

Body（JSON）：

```json
{
  "username": "testuser",
  "password": "123456"
}
```

---

### 登录

```http
POST /api/auth/login
```

Body（JSON）：

```json
{
  "username": "testuser",
  "password": "123456"
}
```

返回：

```json
{
  "code": 0,
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "username": "testuser"
    }
  },
  "message": "success"
}
```

---

### 获取当前用户信息（需要登录）

```http
GET /api/auth/me
```

Header：

```text
Authorization: Bearer JWT_TOKEN
```

---

## 🛡️ 登录鉴权说明

* 使用 JWT 作为 access token
* token 放在请求头 `Authorization: Bearer <token>`
* `middleware/auth.js` 负责校验 token 并解析当前用户

---

## 🧠 项目设计说明

* **Controller**：参数校验、调用 service
* **Service**：核心业务逻辑（注册 / 登录）
* **DAO**：只负责数据库操作，不写业务逻辑
* **Middleware**：鉴权、错误处理
* **Utils**：无业务含义的工具函数

---

## 📝 日志说明

* 当前使用 `console.log` 输出注册 / 登录成功日志
* `logs/` 目录预留给将来文件日志使用

---


## 📌 后续可扩展方向（未实现）

* refresh token
* 用户 CRUD
* 角色 / 权限控制
* 文件日志（winston / pino）
* Docker 部署

---

## 👤 作者 : Schrobit


