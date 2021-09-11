const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// @des create a user
// @method POST /api/v1/user/LoginThirdParty
// @access public
exports.LoginThirdParty = async (req, res, next) => {

    try {
        const reqBody = await req.body;
        const {name, email,photo} = reqBody
        const emailFound = await User.findOne({"email": `${email}`})
        if (!emailFound) {
            
            let newUser = await User.create({
                name,
                email,
                photo
            })
            const _id = newUser._id
            const token = jwt.sign({ email, id: newUser._id }, 'malnav', { expiresIn: '10h' })
            const responseData = {profile:{_id,name,photo,email},token}
            return res.status(201).json(responseData)
        } else{

            const token = jwt.sign({ email, id: emailFound._id }, 'malnav', { expiresIn: '10h' })            
            emailFound.name = name
            emailFound.photo = photo        
            emailFound.save()
            const _id = emailFound._id
            const responseData = {profile:{_id,name,photo,email},token}
            return res.status(201).json(responseData)
        }
        
    }catch (e){
        res.status(500).json('Server Error')
    }
}

