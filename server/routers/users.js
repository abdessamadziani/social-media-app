const express = require("express");
const {
  signup,
  signin,
  activeTrue,
  checkuser,
  reset,
  followingUser,
  userDetailsFromPost,
  userDetails ,
   getUsersToFollow,
   editUser,
   editUserBio,
   signout
} = require("../controllers/userController");
const { userById } = require("../middleware/user");
const { verifyToken } = require("../middleware/verifyToken");
const {isAdmin} = require("../middleware/verifyToken");
const signinValidation = require("../validations/signin.validation");
const { checkValidation } = require("../middleware/checkValidation");
const signupValidation = require("../validations/signup.validation");


const router = express.Router();

router.post("/signup", signupValidation, checkValidation, signup);
router.post("/signin", signinValidation, checkValidation, signin);
router.get("/profile/:token", activeTrue);
router.param("token", userById);

router.post("/checkuser", checkuser);
router.post("/forgetpassword/:token", reset);
router.param("token", userById);
router.get('/signout',signout)





//Following 
router.put("/following/:id" , verifyToken ,followingUser)

router.put("/edit/user/:id" , verifyToken ,editUser)
router.put("/edit/user/bio/:id" , verifyToken ,editUserBio)

router.get("/post/user/details/:id",userDetailsFromPost)

router.get("/user/details/:id",userDetails)

router.get("/all/user/:id", getUsersToFollow)

module.exports = router;
