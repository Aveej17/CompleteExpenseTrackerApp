const jwt = require('jsonwebtoken');

function generateToken (id){
    return jwt.sign({id}, "JWT_KEY");
}

module.exports = generateToken;