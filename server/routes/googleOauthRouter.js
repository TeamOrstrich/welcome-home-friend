const express = require('express');
const passport = require('passport');
// require('./passport');

const router = express.Router()


router.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

router.get("/failed", (req, res) => {
    res.send("Failed")
})
router.get("/success", (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

router.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);