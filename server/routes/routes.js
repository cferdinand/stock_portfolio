const router = require("express").Router();
const { serveStaticFile } = require("../lib/serveIndex.js");
const Auth = require("../middleware/auth.js");
const controllers = require("../controllers/index.js");

/*
Routes to serve the file after authentication
*/
router.get("/login", Auth.isLoggedIn, serveStaticFile);
router.get("/signup", Auth.isLoggedIn, serveStaticFile);

/*
Routes to for user interactions
*/
router.post("/login", controllers.Users.getExistingUser);
router.post("/logout", controllers.Users.logout);
router.post("/signup", controllers.Users.addUser);

/*
Routes to api requests
*/
router.get("/homedata", controllers.Stock.getTopTenData);
router.get("/stock", controllers.Stock.getStockPrice);
router.get("/transactions", controllers.Transactions.getAllTransactions);
router.get("*", Auth.verifySession, serveStaticFile);
router.post(
  "/stock",
  controllers.Portfolio.buyStock,
  controllers.Portfolio.sellStock
);

module.exports = router;
