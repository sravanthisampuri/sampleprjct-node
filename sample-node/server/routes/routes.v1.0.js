let express = require('express');

let router = express.Router();

let loginRouter = require('../api/v1/login/route');
let profileRouter = require('../api/v1/profile/route')


router.use('/login',loginRouter)
router.use('/profile',profileRouter)


module.exports = router;