const express = require("express");
const cookieController = require("../controllers/cookieController.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

// can add cookie settin middleware later if need be

router.post(
  "/signup",
  userController.verifyUser,
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.status)
);

router.post(
  "/login",
  userController.loginUser,
  cookieController.setUsernameCookie,
  (req, res) => res.status(200).json(res.locals.status)
);

//todo: add logout route
router.delete("/logout", cookieController.deleteCookie, (req, res) =>
  res.status(200).json(res.locals.status)
);

module.exports = router;
