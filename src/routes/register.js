const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/customer');
const user = []
const bcrypt = require('bcrypt')
const {regisValidate} = require('../config/db/Validation')

//validate
function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};
router.post('/', async function (req, res, next) {
    try {
        const { error } = regisValidate(req.body);
        if (error)  return res.status(400).send(error.details[0].message);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt)
        CustomerModel.create({
            idc: String(makeid(6)),
            username: req.body.username,
            password: hashed
        })
        res.json({
            status:200,
            message:'regis successfully'
        })
    }
    catch (error) {
        console.log(error);
    }
    console.log(user)
});

module.exports = router;