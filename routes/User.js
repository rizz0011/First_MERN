const express = require("express")

const router = express.Router()


const {userSignup, userLogin, userProfile} = require('../controller/User')
const { auth } = require("../Middleware/auth")


router.post('/sign-up', userSignup)

router.post('/login', userLogin)

router.get('/user-profile/:userID',auth, userProfile)



module.exports = router