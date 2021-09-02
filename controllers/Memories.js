const Memories = require('../models/Memories')
const mongoose = require('mongoose')


// @des get memories by searchs
// @method GET /api/v1/memories/search?searchQuery=:searchQuery
// @access public
exports.getMemoriesBySearch = async (req,res,next) => {
    try {
        const {searchQuery} = req.query
        
        const memories = await Memories.find( { "title": { "$regex": `${searchQuery}`, "$options": "i" } },
        function(err,docs) { 
        });
        
        res.status(200).json(memories)
    }catch(err){
        // return res.status(500).json("Server Error")
    }
}

// @des get all memories
// @method GET /api/v1/memories
// @access public
exports.getMemories = async (req,res,next) => {
    try {
        const memories = await Memories.find();
        res.status(200).json(memories)
    }catch(err){
        return res.status(500).json("Server Error")
    }
}

// @des get all memories
// @method DELETE /api/v1/memories/:id
// @access public
exports.deleteMemory = async (req,res,next) => {
    try{
        if(!req.userId) return res.json('Unauthenticated')

        const memory = await Memories.findById(req.params.id);
        if(!memory){
            return res.status(404).json("ID not found")
        }
        memory.remove();
        return res.status(204).json();
    }catch(err){
        return res.status(500).json("Server Error");
    }
    
}

// @des add an memory
// @method POST /api/v1/memories/:id
// @access public
exports.addMemory = async (req,res,next) => {
    try {
        if(!req.userId) return res.json('Unauthenticated')
        const data = req.body;
        let memory = new Memories({
            title: data.title,
            message: data.message,
            creator: data.creator,
            tags: data.tags,
            selectedFile: data.selectedFile,
        })
        await memory.save();
        res.status(200).json(memory);
        
    } catch (error) {
        return res.status(500).json("Server Error");
    }
}

// @des update like of a memory
// @method PATCH /api/v1/memories/:id/like
// @access public
exports.updateLikes = async (req,res,next) => {
    try{
        if(!req.userId) return res.json('Unauthenticated')
        const id = await req.params.id
        const whoLikedID = req.userId
        const memory = await Memories.findById(id)
        if(!memory){
            return res.status(404).json("ID not found");
        }        
        const index = await memory.whoLiked.indexOf(whoLikedID)
        if(index === -1){
            await memory.whoLiked.push(whoLikedID)
            
        }else{
            await memory.whoLiked.pull(whoLikedID)
        }
        memory.save()
        return res.status(200).json(memory)
    }catch(e){
        return res.status(500).json("Server Error")
    }
}

// @des update a memory
// @method PATCH /api/v1/memories/:id
// @access public
exports.updateMemory = async (req,res,next) => {
    try {        
        const reqBody = await req.body
        const {title , message, creator, tags, selectedFile} = reqBody
        const id = await req.params.id
        const memory = await Memories.findById(id)
        if(!memory){
            return res.status(404).json("ID of the memory is not found")
        }
        memory.title = title
        memory.message = message
        memory.creator = creator
        memory.tags = tags
        memory.selectedFile = selectedFile
        memory.save()
        return res.status(204).json("The memory is updated successfully")
    }   catch (error){
        return res.status(500).json("Server Error")
    }

}

