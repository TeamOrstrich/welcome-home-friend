const cookieController = {};

//sets the cookie equal to the user_id
cookieController.setUsernameCookie = (req, res, next) => {
  if (!req.body.username) {
    next('Message: No userID specified');
  }
  if (res.locals.status.success === true) {
		// setting cookie to user_id
    res.cookie('user_id', res.locals.user_id, {
      maxAge: 900000,
      httpOnly: true,
    });
  }
  next();
};


//sets the cookie equal to the user_id
cookieController.setGoogleOAuthCookie = (req, res, next) => {

  res.cookie('user_id', 48, {
    maxAge: 900000,
    httpOnly: true,
  });
  next();
};

//deletes the cookie if the user logs out
cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie('user_id');

  res.locals.status = { success: false, message: 'Successful Logout!' };
  next();
};

module.exports = cookieController;