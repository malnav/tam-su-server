const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// @des create a user - signup
// @method POST /api/v1/users/signup
// @access public
exports.signUp = async (req, res, next) => {
    try {
        const reqData = req.body;
        
        const { firstName, lastName, email, password } = reqData

        const emailFound = await User.findOne({ email })
        if (emailFound) {
            return res.status(400).json("Email is exist, create another email")
        }
        const hashPassword = await bcrypt.hash(password, 12)
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        const token = jwt.sign({ email, id: newUser._id }, 'malnav', { expiresIn: '10h' })
        const _id = newUser._id
        const name = newUser.firstName+" "+ newUser.lastName
        const photo = newUser.photo
        const responseData = {profile:{_id,name,photo,email},token}
        return res.status(201).json(responseData)

    } catch (error) {
        return res.status(500).json("Server Error")
    } 
}

// @des create a user - signup
// @method POST /api/v1/users/signin
// @access public
exports.signIn = async (req, res, next) => {
    try {
        const reqBody = await req.body;
        const {email, password} = reqBody
        const userFound = await User.findOne({"email": `${email}`})
        if (!userFound) {
          return  res.status(400).json("User doesn't exist")
        } 
        const comparePassword = await bcrypt.compare(password, userFound.password)
        if (!comparePassword){
            return  res.status(400).json("password is not correct")
        }
        
        const token = jwt.sign({ email, id: userFound._id }, 'malnav', { expiresIn: '1h' })

        const responseData = {
            profile:{
                _id: userFound._id,
                name: `${userFound.firstName} ${userFound.lastName}`,
                photo: userFound.photo,
                email: userFound.email
            },token}
        res.status(201).json(responseData)
    }catch (e){
        res.status(500).json('Server Error')
    }
}

