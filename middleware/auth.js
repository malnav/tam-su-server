const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    
    // cut out Bear
    const token = req.headers.authorization.split(" ")[1]
    const googleToken = token.length>500 //true 
    if (token && googleToken){
        const decodedToken = jwt.decode(token)
        req.userId = decodedToken?.sub
        
    }else{
         // Decode token by key
        const decodedToken = jwt.verify(token,'malnav')
        // put id to req.userId
        req.userId = decodedToken.id
    }
    
    // pass to next action
    next()

};