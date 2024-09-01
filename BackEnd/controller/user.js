const User = require('../model/users');
const bcrypt = require('bcrypt');



function isStringValid(string){
    if(string==undefined || string.length === 0){
        return true;
    }
    return false;
}

async function hashPassword(password, saltRounds) {
    try {
        // Await the bcrypt hash operation
        const hash = await bcrypt.hash(password, saltRounds);
        
        return hash; 
    } catch (err) {
        console.error(err);
    }
}

async function compare(userPassword, hashedPassword) {
    try{
        const isMatch = await bcrypt.compare(userPassword, hashedPassword);
        return isMatch;
    }catch{
        throw new Error("Something went wrong");
    }
    
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

        // Hashing the password
        const saltRounds = 10;
        
        const hash = await hashPassword(password, saltRounds);
        // console.log("Stored hash:", hash); // Access the hashed password here
        
        if(user==null){

            const user = await User.create({
                name:name,
                email:email,
                password:hash
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

        const email = req.body.emailId;
        const password = req.body.password;  

        if(isStringValid(email) || isStringValid(password)){
            return res.status(400).json("Missing parameters to login to the account");
        }

        const user = await User.findOne({ where: { email: email } });

        if(user==null){
            return res.status(404).json("User not found");
        }
        
        const passCheck = await compare(password, user.password);
        
        if(passCheck){
            return res.status(200).send("User Logged in successfully");    
        }
        return res.status(401).json("User not authorized")
        
    }
    catch(err){
        console.log(err);
    }

}