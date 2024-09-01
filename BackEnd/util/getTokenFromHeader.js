const getTokenFromHeader = (req) => {
    // get token from headers 
    // console.log(req);
    
    // console.log(req.headers);
    
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token===undefined){
        throw new Error("No token found in the header");
    }
    return token;
}

module.exports = getTokenFromHeader;