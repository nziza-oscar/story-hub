// seeders/YYYYMMDDHHMMSS-seed-posts.js
'use strict';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get user IDs
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY id;`
    );
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('posts', [
      {
        title: 'Getting Started with Node.js',
        slug: generateSlug('Getting Started with Node.js'),
        content: 'Node.js is a powerful JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows you to build scalable network applications...',
        user_id: userIds[0],
        tags: 'javascript,nodejs,programming',
        featured_image: 'https://example.com/nodejs.jpg',
        view_count: 150,
        like_count: 25,
        comment_count: 8,
        published_at: new Date('2024-01-15'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Top 10 Travel Destinations for 2024',
        slug: generateSlug('Top 10 Travel Destinations for 2024'),
        content: 'Here are the most amazing places to visit this year. From tropical beaches to mountain retreats...',
        user_id: userIds[2],
        tags: 'travel,vacation,destinations',
        featured_image: 'https://example.com/travel.jpg',
        view_count: 320,
        like_count: 45,
        comment_count: 12,
        published_at: new Date('2024-02-10'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Healthy Breakfast Recipes',
        slug: generateSlug('Healthy Breakfast Recipes'),
        content: 'Start your day right with these nutritious recipes that will give you energy for hours...',
        user_id: userIds[3],
        tags: 'food,recipes,health,breakfast',
        featured_image: 'https://example.com/food.jpg',
        view_count: 180,
        like_count: 30,
        comment_count: 6,
        published_at: new Date('2024-03-05'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Mastering React Hooks',
        slug: generateSlug('Mastering React Hooks'),
        content: 'Learn how to effectively use React Hooks in your applications. useState, useEffect, and custom hooks...',
        user_id: userIds[1],
        tags: 'react,javascript,frontend,webdev',
        featured_image: 'https://example.com/react.jpg',
        view_count: 275,
        like_count: 38,
        comment_count: 15,
        published_at: new Date('2024-03-20'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};