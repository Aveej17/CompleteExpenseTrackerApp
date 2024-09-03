const jwt = require('jsonwebtoken');

function generateToken (id){
    return jwt.sign({id}, "JWT_KEY",{expiresIn:"1d"});
}

module.exports = generateToken;