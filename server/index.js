const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');
const app=express();
const EmployeeModel= require('./models/Employee')
app.use(cors());
app.use(express.json());
 
mongoose.connect("mongodb://localhost:27017/employee");

app.post('/login', (req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json('Success')
            } else {
                res.json("the password is incorrect")
            }
        } else{
            res.json("No record existed")
        }
    })
})

app.post('/register', (req,res)=>{
  EmployeeModel.create(req.body)
  .then(employees => res.json(employees))
  .catch(err =>res.join(err))
})
app.listen(3001,()=>{
    console.log("Listening Port 3001....")
})