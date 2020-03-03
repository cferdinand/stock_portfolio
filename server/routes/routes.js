const router = require("express").Router();
const { serveStaticFile } = require("../lib/serveIndex.js");
const Auth = require("../middleware/auth.js");
const controllers = require("../controllers/controllers.js");

/*
Routes to serve the file after authentication
*/
router.get("/login", serveStaticFile);
router.get("/home", Auth.verifySession, serveStaticFile);

/*
Routes to for user interactions
*/
router.post("/login", controllers.getExistingUser);
router.post("/logout", controllers.logout);
router.post("/signup", controllers.addUser);

/*
Routes to api requests
*/

module.exports = router;
