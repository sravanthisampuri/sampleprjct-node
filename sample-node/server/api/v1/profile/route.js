let express=require('express')
let router = express.Router();
let profileController = require('./controller')
let userlistDetails = require('./controller')
let addRequestDetails = require('./controller')

router.get('/profiledetails/:id',profileController.profileDetails)
router.get('/userlistDetails',userlistDetails.userDetails)
router.post('/addRequest',addRequestDetails.addRequest)




module.exports = router;
