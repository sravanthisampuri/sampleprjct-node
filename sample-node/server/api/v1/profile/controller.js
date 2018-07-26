let profileCollection = require('../login/model');

let profileDetails=(req,res)=>{
    console.log(req)
    profileCollection.findById({_id:req.params.id})
    .then(
        (response)=>{   
            res.status(200).json({ status : true , message :"Successfully Fetched Details" , userData :response   });
        }
    ).catch(
        (error)=>{
            res.status(500).json({ status : true , message :"Error While fetching Details"}); 
        }
    )
    }
module.exports = {
    profileDetails
  
}