const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const blogPostRoutes = require('./blog-post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blog-post', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;