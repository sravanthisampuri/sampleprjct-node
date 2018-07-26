let express=require('express')
let router = express.Router();
let RegisterController = require('./controller')

router.post('/registerdetails',RegisterController.registerDetails)




module.exports = router;