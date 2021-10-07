const mongoose=require('mongoose');

const visitorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        toLowerCase:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    time:{
        type:String,
    },
    body:{
        type:String,
        trim:true,
        required:true
    }
    
});


const Visitor=mongoose.model('Visitor',visitorSchema);
module.exports = Visitor;