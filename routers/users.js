const express= require('express')
const {signup,signin,activeTrue,checkuser,reset}= require('../controllers/userController')
const { userById } = require('../middleware/user')

const router = express.Router()


router.post('/signup',signup)
router.post('/signin',signin)
router.get('/profile/:token',activeTrue)
router.param('token',userById)

router.post('/checkuser',checkuser)

 router.post('/forgetpassword/:token',reset)
 router.param('token',userById)

module.exports=router