// const { where } = require('sequelize');
const User = require('../model/users');

exports.createUser = async (req, res, next)=>{
    try{
        // console.log(req.body);

        
        
        const name = req.body.userName;
        const email = req.body.emailId;
        const password = req.body.password;

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