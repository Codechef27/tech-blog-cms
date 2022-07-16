const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blog_Post, User, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Blog_Post.findAll({
    attributes: ["id", "title", "body", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "blog_post_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogPostData) => res.json(dbBlogPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Blog_Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "blog_post_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBlogPostData) => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: "No Blogs found with this id" });
        return;
      }
      res.json(dbBlogPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Blog_Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id, //.seesion
  })
    .then((dbBlogPostData) => res.json(dbBlogPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Blog_Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBlogPostData) => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbBlogPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log("id", req.params.id);
  Blog_Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBlogPostData) => {
      if (!dbBlogPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbBlogPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;