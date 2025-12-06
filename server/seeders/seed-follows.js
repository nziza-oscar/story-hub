// seeders/YYYYMMDDHHMMSS-seed-follows.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY id;`
    );
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('follows', [
      { follower_id: userIds[1], following_id: userIds[0], created_at: new Date(), updated_at: new Date() },
      { follower_id: userIds[2], following_id: userIds[0], created_at: new Date(), updated_at: new Date() },
      { follower_id: userIds[3], following_id: userIds[1], created_at: new Date(), updated_at: new Date() },
      { follower_id: userIds[1], following_id: userIds[2], created_at: new Date(), updated_at: new Date() },
      { follower_id: userIds[2], following_id: userIds[3], created_at: new Date(), updated_at: new Date() },
      { follower_id: userIds[3], following_id: userIds[0], created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('follows', null, {});
  }
};