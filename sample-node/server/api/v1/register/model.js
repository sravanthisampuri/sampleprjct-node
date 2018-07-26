let mongoose = require('mongoose')

let registerDetails = new mongoose.Schema({
    email : String,
    password : String,
    name : String,
    profilepicture : String,
    friendsList :[]


})

let registerModel = mongoose.model('register',registerDetails);
module.exports = registerModel;


