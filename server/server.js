const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

const multer = require("multer");

//! Use of Multer
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, '/imgs/'));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});
const upload = multer({
  // dest: 'imgs/'
  storage: storage
});
exports.upload = upload;
// const imageStorage = multer.diskStorage({
//   // Destination to store image     
//   destination: './imgs', 
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() 
//            + path.extname(file.originalname))
//           // file.fieldname is name of the field (image)
//           // path.extname get the uploaded file extension
//   }
// });

// const upload = multer({ dest: "./imgs/" }).single('');


// const storage = multer.diskStorage({
//   destination: function (req, file, )
// })
// const cors = require('cors')  npm i cors later when dealing w cookies
// const cookieParser = require('cookie-parser')

// const apiRouter = require('./routes/api');
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

/*handle parsing request body*/
app.use(express.json());
//  app.use(express.urlencoded({ extended: true }));

/*define route handlers*/
// app.use('/api', apiRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
// route for serving static html
app.use(express.static(path.join(__dirname, "../build")));

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
