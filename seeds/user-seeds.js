
const sequelize = require('../config/connection');
const { User, Blog_Post, Comment } = require('../models');

const userData = [
    {
        username: 'snuggles',
        email: 'snuggles@gmail.com',
        password: 'password123'
      },
      {
        username: 'kit-kat',
        email: 'kit-kat@gmail.com',
        password: 'password123'
      },
      {
        username: 'snow-ball',
        email: 'snow-ball@gmail.com',
        password: 'password123'
      },
]

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;