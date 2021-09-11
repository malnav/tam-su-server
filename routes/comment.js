const express = require('express');
const {addComment,getConfessionComment} = require('../controllers/Comment');
// const auth = require('../middleware/auth')

const router = express.Router();

router.route('/')
    .post(addComment)
    .get(getConfessionComment)

module.exports = router;