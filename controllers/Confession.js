const Confession = require('../models/Confession')
var ObjectID = require('mongodb').ObjectID;

// @des get all confession
// @method GET /api/v1/confession
// @access public
exports.getConfession = async (req,res,next) => {

    try {

        const query = req.query

        if(query.sort === "sortbylike"){
            const DatabaseQuery = Confession.find().sort({"like":-1}).populate('creator');
            DatabaseQuery.exec(function (err, confes) {
                
                return res.status(200).json(confes)
                
        })
        }else if(query.sort === "sortbydate"){
            const DatabaseQuery = Confession.find().sort({"createdAt":1}).populate('creator');
            DatabaseQuery.exec(function (err, confes) {
                
                return res.status(200).json(confes)
                
            })
        }else{
            const confessionQuery = Confession.find().populate('creator');
            confessionQuery.exec(function (err, confes) {
            
            return res.status(200).json(confes)
        })
        }

        
        
    }catch(err){
        console.log(err)
        return res.status(500).json("Server Error")
    }
}


exports.getConfessionDetail = async (req,res,next) => {
    
    try {
        const id = req.params.id
        const confessionQuery = Confession.findOne({_id: new ObjectID(id)}).populate('creator comment');
        confessionQuery.exec(function (err, confession) {
            
            return res.status(200).json(confession)
        })
        
    }catch(err){
        console.log(err)
        return res.status(500).json("Server Error")
    }
}

exports.updateConfessionLike = async (req,res,next) => {
    
    try {
        const id =  req.params.id
        
        const userID = req.body.userID
        
        let result  = await Confession.findById({_id: new ObjectID(id)})
        
        const index = result.like.indexOf(userID)

        if(index > -1)
        {
            result.like.splice(userID, 1);
        }else{
            result.like.push(userID)
        }

        await result.save();
        return res.status(200).json("Update successfully")

    } catch (error) {
        console.log(error)
    }
}

// @des add a confession
// @method POST /api/v1/confession
// @access public
exports.addConfession = async (req,res,next) => {
    try {
        // if(!req.userId) return res.json('Unauthenticated')
        const data = req.body;
        let confession = new Confession({
            title: data.title,
            content: data.content,
            imageURL: data.imageURL,
            creator: new ObjectID(data.creator),
            anonymous: data.anonymous,
            createdAt: new Date()
        })
        confession.save(function(err, c) {
            c.populate('creator', function(err, c) {
                // Do something
                
                res.status(200).json(c);
            })
        });
    
    } catch (error) {
        
        return res.status(500).json("Server Error");
    }
}