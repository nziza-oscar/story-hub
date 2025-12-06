// seeders/YYYYMMDDHHMMSS-seed-comments.js
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

    await queryInterface.bulkInsert('comments', [
      {
        content: 'Great article! Very helpful for beginners.',
        user_id: userIds[1],
        post_id: postIds[0],
        created_at: new Date('2024-01-16'),
        updated_at: new Date('2024-01-16')
      },
      {
        content: 'I tried the oatmeal recipe and it was amazing!',
        user_id: userIds[0],
        post_id: postIds[2],
        created_at: new Date('2024-03-06'),
        updated_at: new Date('2024-03-06')
      },
      {
        content: 'Thanks for sharing these travel tips! Planning my trip now.',
        user_id: userIds[3],
        post_id: postIds[1],
        created_at: new Date('2024-02-11'),
        updated_at: new Date('2024-02-11')
      },
      {
        content: 'Excellent explanation of React Hooks! Can you write about Context API next?',
        user_id: userIds[2],
        post_id: postIds[3],
        created_at: new Date('2024-03-21'),
        updated_at: new Date('2024-03-21')
      },
      {
        content: 'Node.js has changed how I build applications. Great intro!',
        user_id: userIds[3],
        post_id: postIds[0],
        created_at: new Date('2024-01-17'),
        updated_at: new Date('2024-01-17')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};