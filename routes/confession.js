const express = require('express');
const { get } = require('mongoose');
const {getConfessionSorted, updateConfessionLike, getConfessionDetail,getConfession,addConfession} = require('../controllers/Confession')
// const auth = require('../middleware/auth')

const router = express.Router();

router.route('/')
    .get(getConfession)
    .post(addConfession)

router.route('/:id')
    .get(getConfessionDetail)
    .patch(updateConfessionLike)

module.exports = router;