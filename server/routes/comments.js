const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require("../middleware/authenticate")
const {isCommentOwner} = require("../middleware/authorize")

router.get('/:id', auth, commentController.getCommentById);
router.post('/', auth, commentController.createComment);
router.put('/:id',auth,isCommentOwner,commentController.updateComment);
router.delete('/:id',auth,isCommentOwner,commentController.deleteComment);

module.exports = router;