const express = require('express');
const app = express();
const WalletController = require('../controllers/WalletController');
const router = express.Router();
const signatureSigner = require('../middleware/checkSignature').personalSignature;
const passport = require('passport');
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

// take it to wallet routes
router.post('/hide-wallet', [jwtMiddleWare, signatureSigner, dataGuard], WalletController.hideBalance);

module.exports = router;   