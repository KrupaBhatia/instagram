const postModel = require("../model/postModel");
const userModel = require("../model/userModel");
const mongoose = require('mongoose');
const { uploadFile } = require('./awsController')



const createPost = async function (req, res) {
  // console.log(req)
  try {

    const files = req.files
    let data = req.body
    const { userId, desc, likes, img, tags } = data

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, message: "please provide data" });

    if ((!userId) && (typeof userId !== "string")) return res.status(400).send({ status: false, msg: "userId is Required" })

    let userData = await userModel.findById(userId)

    if (!userData) return res.status(404).send({ status: false, msg: "No such user found" })

    if (!tags) return res.status(400).send({ status: false, msg: "tags is Required" })


    if (Object.keys(data).includes(img)) {
      return res
        .status(400)
        .send({ status: false, message: "Post image is required" });
    }

    if (files.length > 0) {
      data.profileImage = await uploadFile(files[0]); //uploading file to aws s3
    } else {
      return res
        .status(400)
        .send({ status: false, message: "ProfileImage File is required" });
    }

    let postData = await postModel.create(data)
    return res.status(201).send({ status: true, message: 'Success', data: postData })



  } catch (err) {
    console.log(err)
    return res.status(500).send({ status: false, message: err.message })
  }

}
module.exports.createPost = createPost


const getPost = async function (req, res) {
  try {

    let postDetails = await postModel.find({ isDeleted: false })
    if (postDetails.length === 0) return res.status(404).send({ status: false, msg: "post not found! " });

    res.status(200).send({ status: true, msg: "get post Sucessfully", data: postDetails });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.getPost = getPost;

const deletePost = async function (req, res) {
  try {
    let postId = req.params.postId;

    let post = await postModel.findById(postId);
  
    if (!post) {
      return res.status(404).send("No such post exists");
    }
    if (post.isDeleted == true) return res.status(400).send({ status: false, msg: "this post is already deleted" })

    let deletePost = await postModel.findOneAndUpdate(
      { _id: postId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    res.status(200).send({ status: true, data: deletePost, msg: "deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message });
  }
};


module.exports.deletePost = deletePost;




const updatePost = async function (req, res) {
  try {
    const postId = req.params.postId
    const data = req.body
    const { desc, tags } = data

    const findPostId = await postModel.findById(postId)
    if (!findPostId ) return res.status(404).send({ status: false, message: "postId doesn't exist" });

    const updatePost = await postModel.findOneAndUpdate(data, { $set : {desc : desc, tags : tags }},{ new: true })
    return res.status(200).send({ status: true, data: updatePost, msg: "updated successfully" });


  } catch (err) {
    console.log(err)
     return res.status(500).send({ status: false, message: err.message }) }

}
module.exports.updatePost = updatePost