const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = Schema({
    createdAt:{
        default: new Date(),
        type: String
    },
    content: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    confession:{
        type: Schema.Types.ObjectId,
        ref: 'Confession'
    }
})

module.exports = mongoose.model('Comment', CommentSchema);