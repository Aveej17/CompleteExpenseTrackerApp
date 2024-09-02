const Razorpay = require('razorpay');
const Order = require('../model/orders');
const { where } = require('sequelize');
const User = require('../model/users');


exports.purchaseCreateController = (req, res, next)=>{
    try{
        var rzp = new Razorpay({
            key_id: 'rzp_test_QvbON6FIPij43r',
            key_secret: 'OCK5SyCRNPQaYEHpBliiGxJA',
        });

        const amount = 2500;
        // console.log(amount);
        

        rzp.orders.create({amount, currency:"INR"}, async (err, order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            try{
                // console.log("rzp Order created");
                // const user = await User.findByPk(req.body.authId);
                // console.log(order);
                
                await Order.create({orderId:order.id, status:"Pending", userId:req.body.authId});
                return res.status(201).json({order, key_id:rzp.key_id});
            }catch(err){
                throw new Error(err);
            }
        })
    }catch(err){
        throw new Error(err);
    }
}

exports.updatePurchaseController = async (req, res, next) =>{
    try{
        // console.log(req.body);
        // console.log(req.body.payment_id);
        await Order.update(
            { paymentId: req.body.payment_id, status: req.body.status },
            { where: { orderId: req.body.order_id } }
        );
        await User.update({isPremiumUser: true}, {where:{ id:req.body.authId}});
          return res.status(201).json({success:true, message:"Payment Status updated"});   
    }
    catch(err){
        throw new Error(err);
    }
}