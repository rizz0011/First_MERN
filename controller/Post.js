const PostModel = require("../models/Post");
const USERMODEL = require("../models/User");

exports.create = async (req, res, next) => {
  try {
    const { userID, ...post } = req.body;
    const newPost = new PostModel({ userID, ...post });
    await newPost.save();
    console.log("newpost - ", newPost);

    const updateUser = await USERMODEL.findOneAndUpdate(
      { userID },
      { $push: { postids: { postID: newPost.postID } } }
    );
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.log("error - ", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const userID = req.params.userID;
    const allPost = await PostModel.find({ userID });
    return res.status(200).json({
      status: "Success",
      data: allPost,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      success: false,
      message: "Failed to get post",
    });
  }
};
