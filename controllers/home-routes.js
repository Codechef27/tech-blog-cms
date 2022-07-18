const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog_Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Blog_Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogPostData => {
      const blogPosts = dbBlogPostData.map(post => post.get({ plain: true }));

      res.render('home', {
        blogPosts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/blog-post/:id', (req, res) => {
  Blog_Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogPostData => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const blogPost = dbBlogPostData.get({ plain: true });

      res.render('single-blog-post', {
        blogPost,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;