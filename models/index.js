const Comment = require("./comment");
const Review = require("./review");
const User = require("./user");

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(Review, {
  foreignKey: "review_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});
Review.hasMany(Comment, {
  foreignKey: "review_id",
});

module.exports = { User, Comment, Review };
