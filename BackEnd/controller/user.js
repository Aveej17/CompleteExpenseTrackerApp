// const { where } = require('sequelize');
const User = require('../model/users');



function isStringValid(string){
    if(string==undefined || string.length === 0){
        return true;
    }
    return false;
}

exports.createUser = async (req, res, next)=>{
    try{
        // console.log(req.body);

        
        
        const name = req.body.userName;
        const email = req.body.emailId;
        const password = req.body.password;

        if(isStringValid(name) || isStringValid(email) || isStringValid(password)){
            return res.status(400).json("Missing parametersto create account");
        }

        const user = await User.findOne({ where: { email: email } });

        if(user==null){
            
            const user = await User.create({
                name:name,
                email:email,
                password:password
            });
            res.send(user);
        }
        else{
            res.status(403).send("user Already Exists");
        }
    }
    catch(err){console.log(err)}
}


exports.loginUser = async (req, res, next)=>{

    try{
        // console.log(req.body);
        // console.log("Login Request");
        
        

        const email = req.body.emailId;
        const password = req.body.password;

        // console.log(email);
        // console.log(password);
        
        

        if(isStringValid(email) || isStringValid(password)){
            return res.status(400).json("Missing parameters to login to the account");
        }

        const user = await User.findOne({ where: { email: email } });

        if(user==null){
            return res.status(404).json("User not found");
        }
        if(user.password!=password){
            return res.status(401).json("User not authorized")
        }
        res.status(200).send("User Logged in successfully");
    }
    catch(err){
        console.log(err);
    }

}