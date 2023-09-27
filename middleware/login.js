
const jwt = require('jsonwebtoken');
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const loginuser = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).send({error : "Access denied please enter valid token"});
    }else{
        try{
            const data = jwt.verify(token,jwtSecretKey);
            req.username = data.username
            if(!req.username){
                res.status(401).send({error : "Access denied please enter valid token"});
            }
            next()
        }catch(err){
            res.status(401).send({error : "Access denied please enter valid token"});
        }
    }
}

module.exports = loginuser