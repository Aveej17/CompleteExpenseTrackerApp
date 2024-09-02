const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const routes = require('./routes/routes');


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// DB
const sequelize = require('./util/database');


const User = require('./model/users');
const Expense = require('./model/expenses');
const Order = require('./model/orders');

const userRoutes = require('./route/user');
const expenseRoutes = require('./route/expense')
const purchaseRoutes = require('./route/purchase');


//cors
app.use(cors());


app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);
app.use('/purchase', purchaseRoutes);


// Associations
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


// Automatic table creation if already no table present

sequelize
.sync()
// .sync({force:true})
.then(
    result =>{
        // console.log(result);
        app.listen(3000);
    } 
).catch(err=>{
    console.log(err)
});