const express = require('express');
const LoginController = require('../controllers/LoginController');
const router = express.Router();
const RegisterController = require("../controllers/RegisterController");
const signatureSigner = require('../middleware/checkSignature').personalSignature;
var dataGuard;

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

router.post('/register', [signatureSigner], RegisterController.registerUser);
router.post('/activate-account', [signatureSigner, dataGuard], RegisterController.activateAccount);
router.post('/resend-code', [signatureSigner, dataGuard], RegisterController.resendCode);
router.post('/login', [signatureSigner, dataGuard], LoginController.login);
router.post('/forgot-password', [signatureSigner, dataGuard], RegisterController.forgotPassword);
router.post('/validate-reset-code', [signatureSigner, dataGuard], RegisterController.validateForgotCode);
router.post('/change-password', [signatureSigner, dataGuard], RegisterController.changePassword);

module.exports = router;   