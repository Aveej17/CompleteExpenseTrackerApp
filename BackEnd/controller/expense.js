const Expense = require('../model/expenses');
const User = require('../model/users');
const isStringValid = require('../util/stringValidation');


exports.getExpenses = async (req, res, next) =>{
    try {
        // console.log(req.body.authId);
        // console.log("getEX");
        
        
        if (!req.body.authId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const expenses = await Expense.findAll({
            where: { userId: req.body.authId }
        });
        const user = await User.findByPk(req.body.authId);

        const customResponse = {
            expenses:expenses,
            isPremium:user.isPremiumUser
        }
        // console.log(customResponse);
        

        res.json(customResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createExpense = async (req, res, next) =>{
    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        const userId = req.body.authId;
        

        if(isStringValid(amount) || isNaN(amount) || isStringValid(description) || isStringValid(category) || isStringValid(userId)){
            return res.status(400).json("Missing parameters ");
        }
        try{
            const user = await User.findByPk(userId);
            user.totalAmountSpent = Number(user.totalAmountSpent) + Number(amount);
            await user.save();
        }

        catch(err){
            throw new Error(err);
        }
        
        res.send(await Expense.create({
            amount:amount,
            description:description,
            category:category,
            userId:userId
        }))
    }
    catch(err){
        return res.status(500).json({error:err, message:"Something went Wrong", success:false});
    }  
}

exports.deleteExpenses = async (req, res, next) =>{

    try{
        // console.log("Delete Called"); 

        const expenseId = req.params.id;
        

        if(isStringValid(expenseId)|| isNaN(expenseId)){
            return res.status(400).json({message:"Missing parameters ", success:false});
        }
        const expense = await Expense.findByPk(expenseId);
        if(expense == null){
            return res.status(404).json({message:"No data found", success: false});
        }
        
        await Expense.destroy({
            where: {
              id: req.params.id,
            },
        });
        // res.redirect('/');
        return res.status(204).json({message:"Deleted Successfully", success:true});
        
    }
    catch(err){
        return res.status(500).json({error:err, message:"Something went wrong", success:false});
    } 
    
}


exports.editExpenses = async (req, res, next) =>{

}