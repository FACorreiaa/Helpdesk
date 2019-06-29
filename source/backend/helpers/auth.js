const jwt=require('jsonwebtoken');
const key=require('./login/config/keys');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decodedToken=jwt.verify(token,key.secretOrKey);
        req.UserData={name:decodedToken.name};
        next();
    }catch(error){
        res.status(401).json({message:"Auth failed!"})
    }

}