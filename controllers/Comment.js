const Comment = require('../models/Comment')
var ObjectID = require('mongodb').ObjectID;

exports.addComment = async (req,res,next) => {
    try {
        const reqData = req.body
        let comment = await Comment.create(reqData)
        comment = await comment.populate('creator').execPopulate()

        
        
        return res.status(200).json(comment);

    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error");
    }
}

exports.getConfessionComment = async (req,res,next) =>{
    try{
        const confessionID = req.query.confession
        const commentQuery = Comment.find({confession: new ObjectID(confessionID)}).populate("creator")
        commentQuery.exec((err,comment)=>{
            return res.status(200).json(comment)
        })
    } catch (error){
        console.log(error)
    }
}
