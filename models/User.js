const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    photo: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
    },
    email: String
});

module.exports = mongoose.model('User',UserSchema);