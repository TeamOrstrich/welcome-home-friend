const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
// Google OAuth Imports
require("./oAuth/googleSetup");
const passport = require("passport");
const cookieSession = require("cookie-session");

const cookieController = require("./controllers/cookieController.js");

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const cors = require("cors");
const cookieParser = require("cookie-parser");

const multer = require("multer");

//! Use of Multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "/imgs/"));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});
const upload = multer({
  // dest: 'imgs/'
  storage: storage,
});
exports.upload = upload;

// const apiRouter = require('./routes/api');
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
// const googleOauthRouter = require("./routes/googleOauthRouter");

// handle parsing request body
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  app.use(express.urlencoded({ extended: true }));

/*define route handlers*/
// app.use('/api', apiRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
// route for serving static html
app.use(express.static(path.join(__dirname, "../build")));

// app.use("/google", googleOauthRouter);
// Google OAuth routes
app.get("/failed", (req, res) => {
  res.send("Failed");
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/google/callback",
  // passport.authenticate("google", {
  //   failureRedirect: "user/login",
  // }),
  (req, res, next) => {
    // hard code user's id
    return next();
  },
  cookieController.setGoogleOAuthCookie,
  function (req, res) {
    res.redirect("/");
  }
);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost${PORT}...`);
});

module.exports = app;
