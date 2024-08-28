const express = require('express');
const router = express.Router();

const Controller = require('../controller/user'); 


router.post('/signup', Controller.createUser);
router.post('/login', Controller.loginUser);


module.exports= router;