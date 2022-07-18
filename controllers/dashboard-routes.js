const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog_Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/',  (req, res) => {
  console.log(req.session);
  console.log('======================');
  Blog_Post.findAll({
    where: {
      user_id: req.session.user_id
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
      const blogPosts = dbBlogPostData.map(blogPost => blogPost.get({ plain: true }));
      res.render('dashboard', { blogPosts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth,  (req, res) => {
  Blog_Post.findByPk(req.params.id, {
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
      if (dbBlogPostData) {
        const blogPost = dbBlogPostData.get({ plain: true });
        
        res.render('edit', {
          blogPost,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;