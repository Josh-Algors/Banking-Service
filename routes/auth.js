const express = require('express');
const app = express();
const UserController = require('../controllers/UserController');
const router = express.Router();
const signatureSigner = require('../middleware/checkSignature').personalSignature;
const passport = require('passport');
const TransferController = require('../controllers/TransferController');
const { Transactions } = require('../database/db');
require('../config/passport');
require('dotenv').config();
var dataGuard;

var jwtMiddleWare = passport.authenticate('jwt', {session: false});

if(process.env.APP != 'local')
{
    dataGuard = require('../middleware/decodeJwt').decodeMiddleware;
}
else
{
    dataGuard = (req, res, next) => {
        next()
    }
}

// router.get('/dashboard', [jwtMiddleWare, signatureSigner, dataGuard], UserController.dashboard);

// router.get('/profile', [jwtMiddleWare, signatureSigner, dataGuard], UserController.getProfile);
// router.put('/profile', [jwtMiddleWare, signatureSigner, dataGuard], UserController.updateProfile);
// router.post('/profile/set-transaction-pin', [jwtMiddleWare, signatureSigner, dataGuard], UserController.setTrasactionPin);


router.post('/transfer/verify-account', [jwtMiddleWare, signatureSigner, dataGuard], TransferController.verifyAccount);
router.post('/transfer/is-enter-pin', [jwtMiddleWare, signatureSigner, dataGuard], TransferController.continueVerify);
router.post('/transfer/verify-pin', [jwtMiddleWare, signatureSigner, dataGuard], TransferController.verifyPin);
// router.post('/transfer/send-money', [jwtMiddleWare, signatureSigner, dataGuard], UserController.setTrasactionPin);



module.exports = router;   