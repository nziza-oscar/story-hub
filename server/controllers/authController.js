const { User, Follow, Post } = require('../models');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../config/jwt');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password
    });

    const token = generateAccessToken(user.id, user.role);
    
    res.status(201).json({
      user: user.toSafeObject(),
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Account doesn't exist" });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateAccessToken(user.id, user.role);
    
    res.json({
      user: user.toSafeObject(),
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    // Count followers
    const followers = await Follow.count({
      where: { following_id: req.userId }
    });

    // Count following
    const following = await Follow.count({
      where: { follower_id: req.userId }
    });

  
    const posts = await Post.count({
      where: { user_id: req.userId }
    });
    res.json({ ...user.toSafeObject(), posts, followers , following  });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  register,
  login,
  getMe
};