const express = require('express')
const commentRouter = express.Router()
const Comments = require('../models/comment')

commentRouter.get('/', (req, res, next) => {
    Comments.find((err, allcomments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allcomments)
    })
})

commentRouter.get('/:commentId', (req, res, next) => {
    const commentId = req.params.commentId
    Comments.findOne(
        {_id: commentId},
        (err, foundComment) => {
            if(err){
                const err = new Error(`Your comment wasn't found.`)
                return next(err)
            }
            return res.status(200).send(foundComment)
        }
    )
})

commentRouter.post('/', (req, res, next) => {
    const newComment = new Comments(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

commentRouter.put('/:commentId', (req, res, next) => {
    Comments.findByIdAndUpdate(
        {_id: req.params.commentId},
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

commentRouter.delete('/:commentId', (req, res, next) => {
    Comments.findOneAndDelete(
        {_id: req.params.commentId},
        (err, deleteComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted comment ${deleteComment.title}`)
        }
    )
})

module.exports = commentRouter