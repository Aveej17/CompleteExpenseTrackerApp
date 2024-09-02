const Expense = require('../model/expenses');
const User = require('../model/users');


exports.getLeaderBoardController = async (req, res, next)=>{
    // console.log("leaderBoard Gets Called");
    // console.log(req.body);
    const expenses = await Expense.findAll();
    const users = await User.findAll();
    // console.log(expenses);
    // console.log(user);

    const ExpenseMap = new Map();
    expenses.forEach(element => {
        if(ExpenseMap.has(element.userId)){
            ExpenseMap.set(element.userId, Number(ExpenseMap.get(element.userId))+Number(element.amount));
        }
        else{
            
            ExpenseMap.set(element.userId, Number(element.amount));
            
        }
    });

    const userMap = new Map();
    users.forEach(user =>{
        if(ExpenseMap.get(user.id)==undefined){
            userMap.set(user.name, 0);
        }
        else{
            userMap.set(user.name, ExpenseMap.get(user.id));
        }
        
    })

    
    // Convert the Map to an array, sort by value in descending order, and convert it back to a Map
    const sortedUserMap = new Map([...userMap.entries()].sort((a, b) => b[1] - a[1]));

    // Print the sorted map
    // for (const [key, value] of sortedUserMap) {
    //     console.log(key + " " + value);
    // }
    // res.status(200).json(sortedUserMap);
    // res.send(sortedUserMap);
    // res.send("ok");

    // Convert the sorted Map to an object
    const sortedUserObject = Object.fromEntries(sortedUserMap);

    // Send the sorted object as a JSON response
    res.status(200).json(sortedUserObject);
}