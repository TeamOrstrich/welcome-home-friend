const db = require("../models/models.js");
const bcrypt = require('bcrypt');
const userController = {};

//create user
userController.createUser = async (req, res, next) => {
  console.log("IN CREATEUSER");
  let { name, username, password } = req.body;
  console.log(`Name: ${name}, Username: ${username}, Password: ${password}`);
  const encryptedPassword = bcrypt.hashSync(password, 10);
  const param = [name, username, encryptedPassword];

  try {
    //push the data into DB
    const newUserQuery = `INSERT INTO public.user(
      name,
      username,
      password
    )
    VALUES($1, $2, $3)
    RETURNING _id;`;

    const result = await db.query(newUserQuery, param);
    // console.log("result:", result);
    // save user_id in res.locals obj to access in cookie middleware
    res.locals.user_id = result;
    // send back user data from db to frontend
    res.locals.status = { success: true, message: "Account created" };

    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: "Express error in createUser middleware",
      status: 400,
      message: {
        err: `userController.createUser: ERROR: ${error}`,
      },
    });
  }
};

// Sign up route: check if user already exists in database
userController.verifyUser = async (req, res, next) => {
  console.log("IN VERIFYUSER");
  const { username } = req.body;
  const param = [username];
  try {
    // Find user in database
    const verifyUserQuery = `SELECT * FROM public.user WHERE username=$1;`;

    // Query result
    const verifyResult = await db.query(verifyUserQuery, param);
    // User does not exist in database
    if (verifyResult.rows.length === 0) {
      // proceed to next middleware to create user
      return next();
    } else {
      // User exists in database
      // Terminate middleware and send back error message to client
      return res.status(404).json();
    }
  } catch (error) {
    return next({
      log: "Express error in verifyUser middleware",
      status: 400,
      message: {
        err: `userController.verifyUser: ERROR: ${error}`,
      },
    });
  }
};

//log in
userController.loginUser = async (req, res, next) => {
  console.log("IN LOGIN USER");
  let { username, password } = req.body;
  const param = [username];

  try {
    const newNameQuery = `SELECT * FROM public.user WHERE username=$1;`;
    const data = await db.query(newNameQuery, param);

    // check to see if the password obtained from database is same as the one sent in req.body
    // compare the password with encrypted password in db
    if (data.rows.length > 0 && bcrypt.compareSync(password, data.rows[0].password)) {
      // save user_id in res.locals obj to access in cookie middleware
      console.log("data.rows[0]._id:", data.rows[0]._id);
      res.locals.user_id = data.rows[0]._id;
      res.locals.status = {
        success: true,
        message: "Successful Login",
        userId: data.rows[0],
      };
      return next();
    }
    res.locals.status = {
      success: false,
      message: "Invalid username or password",
    };
    return next();
  } catch (error) {
    return next({
      log: "Express error in userController.loginUser middleware",
      status: 400,
      message: {
        err: `userController.loginUser: ERROR: ${error}`,
      },
    });
  }
};

module.exports = userController;
