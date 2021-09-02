const express = require('express');
const {signIn,signUp} = require('../controllers/Users')

const router = express.Router();

router.route('/signin')
    .post(signIn)

router.route('/signup')
    .post(signUp)

module.exports = router
