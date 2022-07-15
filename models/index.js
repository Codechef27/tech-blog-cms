
const User = require('./user');
const Blog_Post = require('./blog-post');
const Comment = require('./comment');


User.hasMany(Blog_Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Blog_Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Blog_Post.hasMany(Comment, {
    foreignKey: 'blog_post_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Blog_Post, {
    foreignKey: 'blog_post_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Blog_Post, Comment };





