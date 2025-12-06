const { Follow, User } = require('../models');
const NotificationService = require("../services/notificationService")
const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const follower = await User.findByPk(req.userId)
    if (userId == req.userId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const userToFollow = await User.findByPk(userId);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const [follow, created] = await Follow.findOrCreate({
      where: {
        follower_id: req.userId,
        following_id: userId
      }
    });

    
     if(created){
     
       NotificationService.notify({
        userId,
        notifiableId: req.userId,
        notifiableModelName:"Follow",
        type:"follow_user",
        message: `${follower.username} has started following you.`})
     }
     
    res.status(created ? 201 : 200).json({
      following: true,
      message: created ? 'Followed successfully' : 'Already following'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const deleted = await Follow.destroy({
      where: {
        follower_id: req.userId,
        following_id: userId
      }
    });

    res.json({
      following: false,
      message: deleted ? 'Unfollowed successfully' : 'Not following'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFollowers = async (req, res) => {
  try {
    const followers = await Follow.findAll({
      where: { following_id: req.params.userId },
      include: [
        { model: User, as: 'follower', attributes: ['id', 'username', 'avatar', 'bio'] }
      ]
    });
    
    res.json(followers.map(f => f.follower));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    const following = await Follow.findAll({
      where: { follower_id: req.params.userId },
      include: [
        { model: User, as: 'following', attributes: ['id', 'username', 'avatar', 'bio'] }
      ]
    });
    
    res.json(following.map(f => f.following));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};