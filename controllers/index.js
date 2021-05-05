const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const listRoutes = require("./list-routes.js");

// Probably will be different pages based on how views are made!!
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/list", listRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
