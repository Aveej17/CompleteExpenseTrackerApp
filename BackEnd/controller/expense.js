const Expense = require('../model/expenses');

exports.getExpenses = async (req, res, next) =>{
    try{
        // console.log("fetchQuery");
        const expenses = await Expense.findAll();
        res.send(expenses);
    }
    catch(err){console.log(err)}
}

exports.createExpense = async (req, res, next) =>{

    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        res.send(await Expense.create({
            amount:amount,
            description:description,
            category:category
        }))
    }
    catch(err){console.log(err)}  
}

exports.deleteExpenses = async (req, res, next) =>{

    try{
        console.log("Delete Called");  
        
        await Expense.destroy({
            where: {
              id: req.params.id,
            },
        });
        res.redirect('/');
        
    }
    catch(err){console.log(err)}
    
}




exports.editExpenses = async (req, res, next) =>{

}