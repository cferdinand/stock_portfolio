const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const port = process.env.PORT;
const Auth = require("./middleware/auth.js");
const routes = require("./routes/routes.js");

app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(Auth.createSession);
app.use(
  express.static(path.join(__dirname, "/../client/dist"), {
    maxAge: 1,
    index: false
  })
);

app.get("/", Auth.verifySession, (req, res) => {
  res.redirect("/home");
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`App now listening on port ${port}!`);
});
