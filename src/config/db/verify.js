const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    var token=''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(" ")[1]
    }
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token,"secret");
        req.user = verified;
        
        res.setHeader('userId',verified._id)
        next();
    }catch (err){
        res.status(400).send('Invalid token')
    }
}