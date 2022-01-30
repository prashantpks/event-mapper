const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const fetchuser = (req,res,next)=>{
    const authToken = req.header('auth-token');

    if(!authToken){
        res.status(401).send({error:"Invalid auth token"});
    }

    try{
        const data = jwt.verify(authToken,JWT_SECRET_KEY);
        req.user = data.user;
        next();
    }catch(err){
        res.status(401).send({error:"Internal server error"});
    }
};

module.exports = fetchuser;