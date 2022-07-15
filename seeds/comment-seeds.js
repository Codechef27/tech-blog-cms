
const { Comment, Blog_Post } = require('../models');

const commentData = [
  {
    comment_text: 'I agree, also, kids love playing video games.',
    user_id: 1,
    blog_post_id: 3,
  },
  {
    comment_text: "Congrats Bradley, you're going to kill it.",
    user_id: 2,
    blog_post_id: 2,
  },
  {
    comment_text: 'Wow, crazy cool app, group 5. way to go!',
    user_id: 3,
    blog_post_id: 1,
  },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;