const express = require("express");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

exports.activeTrue = (req, res) => {
  // Update the user's account status to "active"
  User.findByIdAndUpdate(req.profile._id, { active: true })
    .exec()
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(500).json({ error: "Failed to update user account status" });
      } else {
        res
          .status(200)
          .json({
            message: "Token verified and user account is now active",
            userId: updatedUser._id,
          });
      }
    })
    .catch((updateErr) => {
      res.status(500).json({ error: "Failed to update user account status" });
    });
};

exports.signup = async (req, res) => {
  try {
    let email = await User.findOne({ email: req.body.email });
    if (email) {
      return res
        .status(400)
        .json({ message: "User already exisits. Please sign in" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({ ...req.body, password: hashedpassword });

      // return res.status(201).json(user)

      const token = jwt.sign({ _id: 333 }, process.env.JWT_SECRET);
      res.cookie("token", token, { expires: new Date(Date.now() + 600000) });
      const link = `http://localhost:5173/auth/activate-email/${token}`;
      // const link = `http://localhost:5000/api/users/profile/${token}`;
      const mailOptions = {
        from: "Syndicale",
        to: user.email, // Use the user's email
        subject: "Hello Dear " + user.fullname,
        html: `<a href=${link}>Active Account Now</a>`,
      };
      await sendEmail(mailOptions);
      res
        .status(200)
        .json({
          message: "User registration successful please verify your email",
          user: user,
        });
    }

    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // res.cookie('token', token, { expires: new Date(Date.now() + 600000) });

    //  const link = `http://localhost:5173/auth/activate-email/${token}`;
    // const mailOptions = {
    //     from: 'Syndicale',
    //     to: savedAdmin.email, // Use the user's email
    //     subject: 'Hello Dear '+user.name,
    //     // html:`< href="http://localhost:8000/api/admins/profile/${token}">Active Account Now<
    //      html:`<a href=${link}>Active Account Now</a>`

    // }
    // Send the email here
    // await sendEmail(mailOptions);

    // res.status(200).json({ message: 'User registration successful please verify your email', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

exports.signin = (req, res) => {
  console.log("ttt");
  const { email, password } = req.body;

  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Email and Password do not match" });
      }

      if (user.active == false) {
        return res
          .status(401)
          .json({
            error:
              "Sorry you need to activate your aacount first check your email",
          });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.cookie("token", token, { expires: new Date(Date.now() + 600000) });

      const {
        _id,
        fullname,
        email,
        following,
        followers,
        username,
        gender,
        avatar,
        role,
      } = user;
      res.status(200).json({
        token,
        user: {
          _id,
          fullname,
          email,
          following,
          followers,
          username,
          gender,
          avatar,
          role,
        },
      });
    })

    .catch((err) => {
      console.log(err); // Handle errors properly
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.checkuser = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);

      res.cookie("token", token, { expires: new Date(Date.now() + 600000) });

      const link = `http://localhost:5173/auth/forget-password-confirmation`;

      const mailOptions = {
        from: "Social media App",
        to: user.email, // Use the user's email
        subject: "Hello Dear " + user.fullname,
        // html:`<a href="http://localhost:4000/api/users/forgetpassword/${token}">Reset Password</a>`
        html: `<a href="${link}/${token}">Reset Password</a>`,
      };
      // Send the email here
      sendEmail(mailOptions);

      const { _id, fullname, email } = user;
      res.json({
        token,
        user: { _id, fullname, email },
      });
    })

    .catch((err) => {
      console.log(err); // Handle errors properly
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.reset = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.newpassword, 10);

    const user = await User.findById(req.profile._id).exec();

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.password = newPassword;

    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Password reset successful", userId: updatedUser._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset user password" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout" });
};

//Following user
exports.followingUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    const user = await User.findById(req.params.id);
    const otheruser = await User.findById(req.body.userId);

    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await otheruser.updateOne({ $push: { following: req.params.id } });
      return res.status(200).json("User has followed");
    } else {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await otheruser.updateOne({ $pull: { following: req.params.id } });
      return res.status(200).json("User has Unfollowed");
    }
  } else {
    return res.status(400).json("You can't follow yourself");
  }
};

//get user details for post
exports.userDetailsFromPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json("User not found");
    }

    const {
      email,
      password,
      bdate,
      role,
      friends,
      address,
      search,
      ...others
    } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

exports.userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    const { password, address, search, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json("User not found");
    }

    const { username, fullname, avatar } = req.body;
    // Update the user object with new values
    user.username = username;
    user.fullname = fullname;
    user.avatar = avatar;

    // Save the updated user object

    const token = jwt.sign({ _id: user._id }, process.env.jwt_SECRET);
    res.cookie("token", token, { expires: new Date(Date.now() + 600000) });

    const updatedUser = await user.save();

    res.status(200).json({ token, user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

exports.editUserBio = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json("User not found");
    }

    const { bio } = req.body;
    // Update the user object with new values
    user.bio = bio;

    const updatedUserBio = await user.save();

    res.status(200).json(updatedUserBio);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

//get users to follow
exports.getUsersToFollow = async (req, res) => {
  try {
    // const allUser = await User.find();
    const allUserExceptCurrentUser = await User.find({
      _id: { $ne: req.params.id },
    });

    const user = await User.findById(req.params.id);
    const followinguser = await Promise.all(
      user.following.map((item) => {
        return item;
      })
    );
    let UserToFollow = allUserExceptCurrentUser.filter((val) => {
      return !followinguser.find((item) => {
        return val._id.toString() === item;
      });
    });

    let filteruser = await Promise.all(
      UserToFollow.map((item) => {
        if (item !== req.params.id.toString()) {
          const {
            email,
            address,
            bio,
            bdate,
            Followers,
            Following,
            password,
            ...others
          } = item._doc;
          return others;
        }
      })
    );

    res.status(200).json(filteruser);
  } catch (error) {}
};
