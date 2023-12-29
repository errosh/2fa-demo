const { Login, Regiter, generateQr, verifyOtp } = require('../controller/user')

const router = require('express').Router()


router.post('/login',Login)
router.post('/register',Regiter)

router.post('/authenticate',generateQr)

router.post('/verify',verifyOtp)

module.exports = router