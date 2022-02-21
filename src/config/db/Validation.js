const Joi = require('@hapi/joi');

//regis
const regisValidate = data => {
    const schema =Joi.object({
        username: Joi.string()
        .min(6)
        .required(),
        password: Joi.string()
        .min(6)
        .required(),
    })
    return validation = schema.validate(data)
};

const loginValidate = data => {
    const schema =Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return validation = schema.validate(data)
};
const todoValidate = data => {
    const schema =Joi.object({
        id: Joi.string(),
        name: Joi.string(),
        descript: Joi.string(),
        UserId: Joi.string().default(''),
        Date_complete: Joi.string(),
        status: Joi.string().required().valid('New','Complete')
    })
    return validation = schema.validate(data)
};
module.exports.regisValidate = regisValidate;
module.exports.loginValidate = loginValidate;
module.exports.todoValidate = todoValidate;