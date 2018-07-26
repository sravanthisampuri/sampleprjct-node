let express=require('express')
let router = express.Router();
let logController = require('./controller')

router.post('/logindetails',logController.loginDetails)




module.exports = router;
