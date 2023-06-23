const { createUser, loginUser, forgotController, updatePasswordController, allUser } = require('../controllers/userController')

const router = require('express').Router()

// create user route
router.post('/register', createUser)

// login user route
router.post('/login', loginUser)

// forgot password route
router.post('/forgotPassword', forgotController)

// update password route
router.put('/updatePassword', updatePasswordController)

// get all user route
router.get('/getall', allUser)

module.exports = router