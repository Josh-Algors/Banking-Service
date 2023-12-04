const express = require('express');
const LoginController = require('../controllers/LoginController');
const router = express.Router();
const signatureSigner = require('../middleware/checkSignature').personalSignature;
var dataGuard;

if(process.env.APP != 'local')
{
    dataGuard = require('../middleware/decodeJWT').decodeMiddleware;
}
else
{
    dataGuard = (req, res, next) => {
        next()
    }
}

router.post('/login', [signatureSigner, dataGuard], LoginController.login);




module.exports = router;   