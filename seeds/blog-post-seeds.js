const { Blog_Post, User } = require('../models');

const postData = [
  {
    title: 'Revolutionary new app',
    body: 'check out group five new app! ',
    user_id: 1
  },
  {
    title: 'Brad got first devloper job',
    body: 'Brad starts working for a new start-up in October, Comment congrats to him.',
    user_id: 2
  },
  {
    title: 'Playing video games/ kids',
    body: 'Kids playing video games often, develops hightened awareness and problem solving skills',
    user_id: 3
  }
] 

const seedPosts = () => Blog_Post.bulkCreate(postData);

module.exports = seedPosts;