const router = require("express").Router();
const { serveStaticFile } = require("../lib/serveIndex.js");
const Auth = require("../middleware/auth.js");
const controllers = require("../controllers/index.js");

/*
Routes to serve the file after authentication
*/
router.get("/login", serveStaticFile);
router.get("/home", Auth.verifySession, serveStaticFile);

/*
Routes to for user interactions
*/
router.post("/login", controllers.Users.getExistingUser);
router.post("/logout", controllers.Users.logout);
router.post("/signup", controllers.Users.addUser);

/*
Routes to api requests
*/

module.exports = router;
