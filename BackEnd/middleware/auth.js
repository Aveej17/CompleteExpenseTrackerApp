const jwt = require('jsonwebtoken');
const getTokenFromHeader = require('../util/getTokenFromHeader');
const verifyToken = require('../util/verifyToken');

exports.authentication = (req, res, next) => {
    // console.log("Body:", req.body);
    // console.log("Headers:", req.headers);

    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);

    if (!decodedUser) {
        return res.status(401).json({ message: 'Invalid/Expired token, please login again' });
    }

    // console.log(decodedUser.id + " DU");
    const authId = decodedUser.id;

    

    req.body.authId = authId;
    // console.log(req);
    
    // console.log(req.body.authId);

    next();
}