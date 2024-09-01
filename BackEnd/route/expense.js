const express = require('express');
const router = express.Router();

const Controller = require('../controller/expense'); 


router.post('/create', Controller.createExpense);
router.get('/get', Controller.getExpenses);
router.delete('/delete/:id', Controller.deleteExpenses);
router.put('/edit:id', Controller.editExpenses);

module.exports= router;