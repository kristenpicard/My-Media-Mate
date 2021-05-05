const router = require("express").Router();
const sequelize = require("../config/connection");
const { Review, Comment, User, WishList } = require("../models");
const withAuth = require("../utils/auth");

/// WISHLIST ROUTES
router.get("/wishlists", withAuth, (req, res) => {
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
      console.log("wishlist", JSON.stringify(wishlistData, null, 2));

      const wishlists = wishlistData.map((wishlist) =>
        wishlist.get({ plain: true })
      );

      res.render("wishlists", { wishlists, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/editwishlist/:id", withAuth, (req, res) => {
  WishList.findOne({
    where: {
      id: req.params.id,
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
      if (!wishlistData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const wishlist = wishlistData.get({ plain: true });
      res.render("edit-wishlist", {
        wishlist,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
