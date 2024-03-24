const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
// const { verifyToken } = require("./verifytoken");
const { verifyToken } = require("../middleware/verifyToken");




router.get('/api/data', (req, res) => {
  res.json({ message: 'Data retrieved successfully', data: { name: 'John', age: 30 } });
});





//Create Post
router.post("/user/post", verifyToken, async (req, res) => {
  try {
    let { title, image, video } = req.body;
    let newpost = new Post({
      title,
      image,
      video,
      userId: req.profile.id,
    });
    const post = await newpost.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(req.profile.id);
    return res.status(500).json("Internal error occured");
  }
});

//get posts of specific user
router.get("/get/post/:id", verifyToken, async (req, res) => {
  try {
    const mypost = await Post.find({ userId: req.params.id });
    if (!mypost) {
      return res.status(200).json("You don't have any post");
    }

    res.status(200).json(mypost);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

//update post
router.put("/update/post/:id", verifyToken, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json("Post does not found");
    }
    if (post.userId.toString() === req.profile.id) {
      post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      let updatepost = await post.save();
      res.status(200).json(updatepost);
    } else {
      return res.status(400).json("You are not allow to edit this post");
    }
  } catch (error) {
    return res.status(500).json("Internal error occured");
  }
});

//Like
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.like.includes(req.profile.id)) {
      if (post.dislike.includes(req.profile.id)) {
        await post.updateOne({ $pull: { dislike: req.profile.id } });
      }
      await post.updateOne({ $push: { like: req.profile.id } });
      return res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { like: req.profile.id } });
      return res.status(200).json("Post has been unlike");
    }
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
});
//Dislike
router.put("/:id/dislike", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislike.includes(req.profile.id)) {
      if (post.like.includes(req.profile.id)) {
        await post.updateOne({ $pull: { like: req.profile.id } });
      }
      await post.updateOne({ $push: { dislike: req.profile.id } });
      return res.status(200).json("Post has been disliked");
    } else {
      await post.updateOne({ $pull: { dislike: req.profile.id } });
      return res.status(200).json("disliked has been removed");
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

//Comment
router.put("/comment/post", verifyToken, async (req, res) => {
  try {
    const { postId, comment, profileImage } = req.body;
    const commentObj = {
      userId: req.profile.id,
      username: req.profile.username,
      comment,
      profileImage,
    };
    const post = await Post.findById(postId);
    console.log("xxxxxxxxxx::::::::::", commentObj);
    post.comments.push(commentObj);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});


router.put("/delete/comment", verifyToken, async (req, res) => {
  try {
    const { postId,commentId } = req.body;
    console.log(postId,commentId)

    // Check if postId and commentId are provided
    if (!commentId) {
      return res.status(400).json({ error: "commentId are required" });
    }


    const post = await Post.findById(postId);

    // Check if post with given postId exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

   console.log(post.userId.toHexString())


    // Check if commentId exists in post's comments array
   
    const commentIndex = post.comments.findIndex(comment => comment._id.toHexString() === commentId && comment.userId.toHexString() === req.profile.id);
    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found or you dont have access" });
    }
    
    // const commentIndexx2 = post.comments.findIndex(comment =>  comment.userId.toHexString() === req.profile.id);
    // if (commentIndexx2 === -1) {
    //   return res.status(404).json({ error: "u dont have access to delete this comment" });
    // }

    // Remove comment from comments array
    
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    // Send success response
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


//Delete post
router.delete("/delete/post/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log((post.userId).toString()  ,"|||", req.profile.id )
    if (post.userId.toString() === req.profile.id) {
      const deletepost = await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json("You post has been deleted");
    } else {
      return res.status(400).json("You are not allow to delete this post");
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

/// Get a Following of user
router.get("/following/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followinguser = await Promise.all(
      user.following.map((item) => {
        return User.findById(item);
      })
    );

    let followingList = [];
    followinguser.map((person) => {
      // const {email, password ,active,following, address,bio, bdate , Followers , ...others} = person._doc;
      const { email, password, ...others } = person._doc;

      followingList.push(others);
    });

    res.status(200).json(followingList);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

/// Get a Followers of user
router.get("/followers/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followersuser = await Promise.all(
      user.followers.map((item) => {
        return User.findById(item);
      })
    );

    let followersList = [];
    followersuser.map((person) => {
      // const {email, password , bdate,active,friends,address,bio , Following , Followers , ...others} = person._doc;
      const { email, ...others } = person._doc;

      followersList.push(others);
    });

    res.status(200).json(followersList);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

//Fetch posts from users that i follow
router.get("/flw/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const UsersThatIFollowPosts = await Promise.all(
      user.following.map((item) => {
        return Post.find({ userId: item });
      })
    );
    const userPost = await Post.find({ userId: user._id });

    res.status(200).json(userPost.concat(...UsersThatIFollowPosts));
    // res.status(200).json(followersPost);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});
module.exports = router;
