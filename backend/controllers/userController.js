const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

//description Register a new user
//router /api/users/register
//access public

const registerUser = asyncHandler(async (req, res) => {
    const {name, phone_no, email, password} = req.body ;

    //validate
    if(!name || !phone_no || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Check if user already exits
    const userExits = await User.findOne({ email });

    if(userExits) {
         res.status(400)
         throw new Error('User already exits')
        
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const user = await User.create({
        name,
        phone_no,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phone_no: user.phone_no,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
        
    }
})

//description Register a new user
//router /api/users/register
//access public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //find user by email
    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password, user.password)) {
        //Password match
        res.status(200).json({
            _id: user._id,
            name: user.name,
            phone_no: user.phone_no,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        //Invalid credentials
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

//description Get current user
//router /api/users/me
//access Private

const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user)
})

//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {registerUser, loginUser, getMe, generateToken} ;