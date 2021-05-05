const router = require("express").Router();
const sequelize = require("../config/connection");
const { Review, Comment, User, WishList } = require("../models");
const withAuth = require("../utils/auth");

// REVIEW ROUTES ON DASHBOARD
router.get("/", withAuth, (req, res) => {
  Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "review_body", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_body",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((review) => review.get({ plain: true }));
      console.log(JSON.stringify(reviews, null, 2));

      res.render("dashboard", { reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "created_at", "review_body"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_body",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((reviewData) => {
      if (!reviewData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const review = reviewData.get({ plain: true });
      res.render("edit-review", {
        review,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create/", withAuth, (req, res) => {
  Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "review_body"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_body",
          "review_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((reviewData) => {
      const reviews = reviewData.map((review) => review.get({ plain: true }));
      res.render("create-review", { reviews, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/createwishlist/", withAuth, (req, res) => {
  WishList.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "wishlist_title"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((wishlistData) => {
      const wishlists = wishlistData.map((wishlist) =>
        wishlist.get({ plain: true })
      );
      res.render("create-wishlist", { wishlists, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
