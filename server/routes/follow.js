const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const auth = require("../middleware/authenticate")
router.post('/:userId',auth, followController.followUser);
router.delete('/:userId', auth, followController.unfollowUser);
router.get('/followers/:userId',auth, followController.getFollowers);
router.get('/following/:userId',auth, followController.getFollowing);
 
module.exports = router;