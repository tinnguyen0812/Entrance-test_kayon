const express = require('express');
const router = express.Router();
const verify =  require('../config/db/verify')
const TodoModel = require('../models/todo');
const Users = require('../models/customer')
const jwt = require('jsonwebtoken');
router.get('/list',verify,async function(req,res){
    const todo= await TodoModel.find({});
    if(todo){
        res.json({
            todo: todo
        })
    }
    else{
        res.json({
            message:'list is empty!'
        })
    }
});
router.get('/get-all-user',verify,async function(req,res){
    const user= await Users.find({});
    if(user){
        res.status(200).json({
            users: user
        })
    }
    else{
        res.json({
            message:'list is empty!'
        })
    }
});
router.get('/get-all-task/:id',verify,async function(req,res){
    try{
        const todo = await TodoModel.findOne({UserId:req.params.id})
        res.status(200).json({
            todo:todo
        })
    }catch(error){
        res.status(400).json(error)
    }
    
})
router.get('/todo/:id',verify,async function(req,res){
    const id = req.params.id;
    const todo= await TodoModel.findOne({id:id});
    if(todo){
        res.json({
            todo: todo
        })
    }
    else{
        res.json({
            message:'Job not exist!'
        })
    }
});
router.post('/todo',verify,async function(req,res){
    const new_todo = req.body;
    if(req.body.status =='New'||req.body.status =='Complete')
    {
        try{
            TodoModel.create({
                id:new_todo.id,
                name: new_todo.name,
                descript: new_todo.descript,
                status: new_todo.status,
                UserId: new_todo.UserId,
                Date_complete: new_todo.Date_complete         
            })
            const todo= await TodoModel.findOne({id:new_todo.id});
            res.status(200).send({
                todo:todo
            })
        }catch (error){
            console.log(error)
            res.send({
                status:404,
                message:error
            })
        }
    }else{
        res.send({
            message:"Status not valid"
        })
    }
    
});
router.put('/assign_todo/:id',verify,async(req,res)=>{
    var token=''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(" ")[1]
    }
    const verified = jwt.verify(token,"secret");
    let todo=req.params.id;
    const user_assign = req.body;
    if(verified._id == user_assign.userId )
    {
        res.json({
            message:"You are not allowed to assign work to yourself!"
        })
    }else{
        try{
            const temp = await TodoModel.findOne({id:todo});
            temp.UserId = user_assign.userId;
            await temp.save();
            res.json({
                message:"assign successful!"
            })
        }catch(error){
            console.log(error)
            res.json(error)
        }
    }
    
    
})
router.put('/todo_update',verify,async(req, res, next) => {
    const todo=req.body
    const key = Object.keys(todo)
    try{
        const temp = await TodoModel.findOne({id:todo.id})

        if(!temp) {
            return res.status(404).send("Can not find this job!")
        }
        key.forEach((update) => temp[update]=todo[update])
        await temp.save();
        res.status(200).json({
            todo:temp,
            save:true
        })
    }catch(error){
            console.log(error);
            res.status(400).json({
                message:error,
                save:false
            })
        }     
});
router.delete('/del/:id',verify,async function(req,res,next){
    const id = req.params.id;
    console.log(req.params)
    const todo = TodoModel.findOne({id:id})
    try{
        if(todo.status != 'Complete'){
            await TodoModel.findOneAndDelete({id:id})
            res.json({
                delete:true
            })
        }
        else{
            res.json({
                message:'status not valid!'
            })
        }
    }catch(error){
        console.log(error);
        res.json({
            save:false
        })
    }
});

module.exports = router;