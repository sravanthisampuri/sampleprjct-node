let mongoose = require('mongoose');



let loginDetails = new mongoose.Schema({
    email : String,
    password : String,
    name : String,
    profilepicture : String,
    friendsList :[]


})

let logModel = mongoose.model('users',loginDetails);
module.exports = logModel;