// let mongoose = require('mongoose');
// let jwt = require('jsonwebtoken')
// let config = require('../../../config/config')

let logCollection = require('../login/model');

let loginDetails =(req,res)=>{
    console.log(req.body)
    logCollection.findOne({email:req.body.email})
        .then(
            (response)=>{
                /* console.log(response) */
                if(response.password == req.body.password){
                    res.status(200).json({ status : true , message :"Successfully loggedin" , user :response   }); 
                }else{
                    res.status(200).json({ status : false , message :"Wrong Credentials"   });  
                }
            }
        ).catch(
            (error)=>{
                res.status(500).json({ status : false , message :"Error while creating add , please again"   })
            }
        )
}


module.exports = {
    loginDetails
  
}