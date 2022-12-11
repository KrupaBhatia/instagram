const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const postModel = require("../model/postModel");

const authmid = async function (req, res, next) {
  try {
    // =======================authentication=====================

    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(400) .send({status: false,  msg: " please provide the token" });
    }
    // console.log(token);
    let decodedToken = jwt.verify(token, "instagram");
    
    if (!decodedToken) {
      return res.status(400).send({ status: false, msg: "token is invalid" });
      
    }
    req.decodedToken=decodedToken
    // req.author_Id=decodedToken.author_Id
    // let findauthorId = decodedToken.author_Id;
    next();
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }};

  module.exports.authmid = authmid;


  const authorise = async function (req, res, next) {
    try {
      let token = req.headers["x-api-key"];
  if (!token) {
    return res.status(400) .send({status: false,  msg: " provide the token " });
  }
      let decodedToken = jwt.verify(token, "instagram");
     
      if (!decodedToken) {
        return res.status(400).send({ status: false, msg: "token is invalid" });
        
      }
  let postId = req.params.postId;
  let findid = await postModel.findById(postId);
  console.log(findid)
  let finduserId = decodedToken.userId;
  let checkuser = findid.userId.toString();
  console.log(finduserId)
    console.log(checkuser)

  if (checkuser !== finduserId)
    return res.status(403).send({ status: false, msg: "User logged is not allowed to modifify" });  
  next();
} catch (err) {
  return res.status(500).send({ status: false, msg: err.message });
}
};


module.exports.authorise = authorise;