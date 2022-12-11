const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const postController = require('../controller/postController')
const mid = require("../middleware/mid")


router.post('/createuser', userController.createUser);
router.post('/login', userController.login);



router.post('/createpost',mid.authmid, postController.createPost);
router.get('/getpost',mid.authmid, postController.getPost);
router.put('/update/:postId',mid.authmid,mid.authorise, postController.updatePost);
router.delete('/delete/:postId',mid.authmid, mid.authorise, postController.deletePost);
// router.get('/get',Controller.get1);
// router.delete('/delt',Controller.del);


module.exports = router;