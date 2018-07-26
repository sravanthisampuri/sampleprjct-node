let express=require('express')
let router = express.Router();
let profileController = require('./controller')

router.get('/profiledetails',profileController.profileDetails)




module.exports = router;
