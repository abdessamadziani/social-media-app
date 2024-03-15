const express = require("express");
const {
  signup,
  signin,
  activeTrue,
  checkuser,
  reset,
  followingUser,
  userDetailsFromPost,
   getUsersToFollow,
} = require("../controllers/userController");
const { userById } = require("../middleware/user");
const { verifyToken } = require("../middleware/verifyToken");


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile/:token", activeTrue);
router.param("token", userById);

router.post("/checkuser", checkuser);
router.post("/forgetpassword/:token", reset);
router.param("token", userById);




//Following 
router.put("/following/:id" , verifyToken ,followingUser)

router.get("/post/user/details/:id",userDetailsFromPost)

router.get("/all/user/:id", getUsersToFollow)

module.exports = router;
