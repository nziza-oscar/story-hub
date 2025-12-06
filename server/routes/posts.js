const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require("../middleware/authenticate")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const {isPostOwner} = require("../middleware/authorize")
// Public routes
router.get('/', auth, postController.getAllPosts);
router.get('/:id',auth, postController.getPostById);
router.get('/:id/comments', postController.getPostComments);
router.post('/create',auth, upload.single("photo"),postController.createPost);
router.put('/:id/update',auth, isPostOwner, postController.updatePost);
router.delete('/:id/delete', auth, isPostOwner, postController.deletePost);
router.post('/:id/like',auth, postController.likePost);
router.delete('/:id/like',auth, postController.unlikePost);

module.exports = router;