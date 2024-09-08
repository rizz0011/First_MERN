const express = require("express")
const router = express.Router()
const { auth } = require("../Middleware/auth")
const controller = require("../controller/Post")

router.post('/create', auth, controller.create)

router.get('/post-details/:userID', auth, controller.getPost)

module.exports = router