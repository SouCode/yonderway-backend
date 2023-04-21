const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { genToken } = require('../utils/userMiddleware');

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // find user in DB by username
    const user = await User.findOne({ username });

    // check username and password macth
    if (user && (await user.matchPassword(password))){
        // if the user if found return the user data
        res.json({
            _id: user._id,
            username: user.username,
            token: genToken(user._id)
        })
        // if the user is not found
    } else {
        res.status(400)
        throw new Error('Invalid username and/or password')
    }

});

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // check if user already exists by checking username
    const userExists= await User.findOne({ username })
    if(userExists) {
        res.status(400) // error
        throw new Error('User Already Exists')
    };

// CREATE
    // if user does not exist create user in DB
    const user = await User.create({
        username,
        password
    });
    // once user is created return success with DB assigned ID
    if(user){
        res.status(201).json({ // successful
            _id: user._id,
            username: user.username,
            token: genToken(user._id)
        });
    } else {
        res.status(400) // not successful
        throw new Error('User Register Error')
    };
});



module.exports = { registerUser, loginUser };