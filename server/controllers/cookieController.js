const bcrypt = require('bcrypt');

const cookieController = {};

//sets the cookie equal to the user_id
cookieController.setUsernameCookie = (req, res, next) => {
  if (!req.body.username) {
    next('Message: No userID specified');
  }
  if (res.locals.status.success === true) {
    const hash = bcrypt.hashSync(res.locals.user_id, 10);
		// setting cookie to user_id
    res.cookie('user_id', hashSync, {
      maxAge: 900000,
      httpOnly: true,
    });
  }
  next();
};


//sets the cookie equal to the user_id
cookieController.setGoogleOAuthCookie = (req, res, next) => {
  // Hack: presentation user_id
  const tmpUserId = '48';
  // hash password before adding to database 
  const hash = bcrypt.hashSync(tmpUserId, 10);
  console.log('Hash: ', hash);
  res.cookie('user_id', hash, {
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