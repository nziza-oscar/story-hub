// seeders/YYYYMMDDHHMMSS-seed-users.js
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        bio: 'System administrator',
        avatar: 'https://example.com/avatar1.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        bio: 'Software developer and blogger',
        avatar: 'https://example.com/avatar2.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'janedoe',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        bio: 'Content writer and photographer',
        avatar: 'https://example.com/avatar3.jpg',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'alexsmith',
        email: 'alex@example.com',
        password: hashedPassword,
        role: 'user',
        bio: 'Travel enthusiast and food blogger',
        avatar: 'https://example.com/avatar4.jpg',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};