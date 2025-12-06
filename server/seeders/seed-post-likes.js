// seeders/YYYYMMDDHHMMSS-seed-post-likes.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY id;`
    );
    const userIds = users[0].map(user => user.id);

    // Get post IDs
    const posts = await queryInterface.sequelize.query(
      `SELECT id FROM posts ORDER BY id;`
    );
    const postIds = posts[0].map(post => post.id);

    await queryInterface.bulkInsert('post_likes', [
      { user_id: userIds[1], post_id: postIds[0], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[2], post_id: postIds[0], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[3], post_id: postIds[1], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[0], post_id: postIds[1], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[1], post_id: postIds[2], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[2], post_id: postIds[3], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[3], post_id: postIds[3], created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[0], post_id: postIds[3], created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('post_likes', null, {});
  }
};