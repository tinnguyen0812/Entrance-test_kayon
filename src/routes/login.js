const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/customer');
const {loginValidate} = require('../config/db/Validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();


router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/',async function (req,res,next){
    const { error } = loginValidate(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
        //check email
        user= req.body;
        const customer = await CustomerModel.findOne({username:user.username});
        if(customer){
            if (!customer) return res.status(400).send('Email is wrong');
                //check password
                const validPass = await bcrypt.compare(user.password,customer.password);
                if(!validPass) return res.status(400).send('password is wrong');
                //create token
                const token = jwt.sign({_id:customer._id,username:customer.username},"secret");
                res.json({
                    token:token,
                    status:200
                });
            }
})
module.exports = router;
