const { User, Post } = require('../models');
const {Op} = require("sequelize")
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where:{
        id:{
          [Op.ne]:req.userId
        }
      },
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
2    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.params.id },
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'avatar'] }
      ]
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { username, bio, email, password } = req.body;
    const updates = {};

    // Attempt to update username only if it doesn't exist for another user
    if (username && username !== user.username) {
      const existingUser = await User.findOne({
        where: { username, id: { [Op.ne]: user.id } }
      });
      if (!existingUser) {
        updates.username = username;
      }
    }

    // Attempt to update email only if it doesn't exist for another user
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({
        where: { email, id: { [Op.ne]: user.id } }
      });
      if (!existingEmail) {
        updates.email = email;
      }
    }

    // Always update bio if provided
    if (bio !== undefined) updates.bio = bio;

    // Update password if provided
    if (password) updates.password = password;

    // If nothing to update
    if (Object.keys(updates).length === 0) {
      return res.json({ user: user.toSafeObject(), message: 'No changes made' });
    }

    await user.update(updates);

    return res.json( user.toSafeObject());

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  getAllUsers,
  getUserById,
  getUserPosts,
  updateProfile
};