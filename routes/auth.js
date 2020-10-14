const express = require("express");
const bodyParser = require("body-parser");
// const { check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const saltRounds=10;
//
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

const User = require("../model/User");
// const  registerValidation = require("../validation");

//validationResult

router.post("/register", function (req,res) {
  // Lets validate the data before we a user
  const name =req.body.name ;
  const email =req.body.email ;
  // console.log(req.body);
  // console.log(req.body.name);
//   const { error } = registerValidation(req.body);
//
// if(error) return res.status(400).send(error.details[0].message);


//
// const existsEmail =  User.findOne({email: email});
//
//  if(existsEmail)
//  {
//    res.send("Email already exists");
//  }
//   console.log("out");
 bcrypt.hash(req.body.password, saltRounds, function(req,hash){

   const user = new User({
     name:name,
     email:email,
     password:hash
   });
   user.save(function(err){
     if(err)
     console.log(err);
     else {
       res.send(user);
     }
   });
 });

    });

router.post("/login", function (req,res) {
      // Lets validate the data before we a user

      const email =req.body.email ;
      const password = req.body.password;
      // console.log(req.body);
      // console.log(req.body.name);
      // const existsEmail =  User.findOne({email: email});
      //
      //  if(!existsEmail) return res.status(400).send("Email don't exists");

       User.findOne({email: email}).then(user => {

         bcrypt.compare(password, user.password) // to compare the stored and entered password, returning because this will give us a promise
         .then(equal=>{  //will get a true or false
           if(!equal){
             res.json("password incorrect")
        }


        res.status(200).json({userId:user._id.toString() , message:'User logged in', username:user.name})

   })
   .catch((err) => {
      res.json("soomething went wrong");
     });
}).catch(err => {res.json("user not found")})



});
module.exports = router;
