const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ConfessionSchema = Schema({
    title: String,
    content: String,
    imageURL: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        default: new Date(),
        type: String
    },
    like:[],
    anonymous:{
        default:true,
        type:Boolean
    }
})

module.exports = mongoose.model('Confession', ConfessionSchema);