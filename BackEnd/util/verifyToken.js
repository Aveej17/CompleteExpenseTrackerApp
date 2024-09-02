const jwt = require('jsonwebtoken');
const verifyToken = (token) =>{
    // console.log(token);
    
    return jwt.verify(token, "JWT_KEY", (err, decoded) =>{
        if(err){
            throw new Error("Token expired/invalid");
        }else{
            return decoded;
        }
});}

module.exports = verifyToken;