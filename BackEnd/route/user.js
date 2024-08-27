const express = require('express');
const router = express.Router();

const Controller = require('../controller/user'); 


router.post('/signup', Controller.createUser);


module.exports= router;