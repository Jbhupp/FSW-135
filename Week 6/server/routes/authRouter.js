const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken')


authRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next( new Error("That username is already taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err) {
            res.status(500)
            return next(err)
            }
            var tempUser = savedUser.withoutPassword()
            // console.log(tempUser)
        const token = jwt.sign(tempUser, process.env.SECRET)
        return res.status(201).send({ token, user: tempUser})
    })
    })
})

authRouter.post('/login', (req, res, next) => {
    const failedLogin = 'Username or Password is incorrect.'
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error(failedLogin))
        }
            console.log(user, req.body)
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error(failedLogin))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error(failedLogin))
            }
            var tempUser = user.withoutPassword()
            console.log(tempUser)
            const token = jwt.sign(tempUser, process.env.SECRET)
            return res.status(200).send({ token, user:tempUser })
        })
    })
})

module.exports = authRouter