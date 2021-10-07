const express = require('express');
const {sendTextMessage}=require('../Methods/sendMessage');
const {sendMail}=require('../Methods/sendEmail');
let router = express.Router();
const Visitor = require('../model/visitor');

router.post('/visitor',async(req, res)=>{
    try{
        console.log(req.body);
    await Visitor.create(req.body);
    console.log("data saved");
    sendTextMessage(`Hey ${req.body.name} ,welcome to Fitness galaxy gym! You entered in the gym at ${req.body.time}.Your Body Part to train is ${req.body.body}`,`+91${req.body.phone}`);
    sendMail(`${req.body.email}`,'fitness galaxy gym',`Hey ${req.body.name} ,welcome to Fitness galaxy gym! You entered in the gym at ${req.body.time}.Your body part to train is ${req.body.body}`);
    res.redirect('/logs');
    }
    catch(e)
    {
        console.log(e.message);
        res.redirect('/');
    }
});
router.get('/logs',async (req,res)=>{
  const users= await Visitor.find({});
    res.render('pages/logs',{users});
});
router.get('/logs/:id/edit',async(req,res)=>{
    try{
        const {id}=req.params;
        const val=await Visitor.findById(id);
         res.render('pages/edit',{val})
    }
    catch(e){
        console.log(e.message);
    }
})
router.delete('/logs/:id',async (req,res)=>{
    let currentTime = new Date();

let currentOffset = currentTime.getTimezoneOffset();

let ISTOffset = 330;   // IST offset UTC +5:30 

let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

let time = ISTTime.getHours()+":"+ISTTime.getMinutes();
    const {id}=req.params;
    const user=await Visitor.findById(id);
    await Visitor.findByIdAndDelete(id,{new:true});
    sendTextMessage(`Hey ${user.name} , You left the gym at ${time}.Your Body Part to train was ${user.body}.Stay safe Stay Healthy`,`+91${user.phone}`);
    sendMail(`${user.email}`,'fitness galaxy gym',`Hey ${user.name} , You left the gym at ${time}.Your body part to train was ${user.body}.Stay safe Stay Healthy`);
    res.redirect('/logs');
})
router.patch('/logs/:id',async(req,res)=>{
    try{
        const {id}=req.params;
       const data={...req.body};
       console.log(data);
       await Visitor.findByIdAndUpdate(id,data);
       res.redirect('/logs');
    }
    catch(e){console.log(e.message)};
})
module.exports =router;
