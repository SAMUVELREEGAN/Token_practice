const UserControlller = require('../Controller/UserController')

const express = require('express')

const UserRouter = express.Router()

UserRouter.post('/signup',UserControlller.singup)
UserRouter.post('/login',UserControlller.login)

module.exports = UserRouter