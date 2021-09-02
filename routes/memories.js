const express = require('express');
const {getMemories, getMemoriesBySearch, updateMemory, deleteMemory, addMemory, updateLikes} = require('../controllers/Memories')
const auth = require('../middleware/auth')

const router = express.Router();

router.route('/search')
    .get(getMemoriesBySearch)

router.route('/')
    .get(getMemories)
    .post(auth,addMemory)

router.route('/:id')
    .delete(auth,deleteMemory)
    .patch(updateMemory)


router.route('/:id/like')
    .patch(auth,updateLikes)
    

module.exports = router;