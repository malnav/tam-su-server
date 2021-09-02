const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    whoLiked:{
        type: [String],
        default:[]
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('Memories',MemorySchema);