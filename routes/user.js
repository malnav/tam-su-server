const express = require('express');
const {LoginThirdParty} = require('../controllers/User')

const router = express.Router();

router.route('/LoginThirdParty')
    .post(LoginThirdParty)

module.exports = router
