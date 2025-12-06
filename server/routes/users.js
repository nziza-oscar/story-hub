const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require("../middleware/authenticate")

router.get('/', auth, userController.getAllUsers);
router.get('/:id',auth, userController.getUserById);
router.get('/:id/posts',auth, userController.getUserPosts);

router.put('/profile',auth, userController.updateProfile);

module.exports = router;