const express = require('express');
const app = express();
const UserController = require('../controllers/UserController');
const AuditController = require('../controllers/AuditLogsController');
const router = express.Router();
const signatureSigner = require('../middleware/checkSignature').personalSignature;
const passport = require('passport');
require('../config/passport');
require('dotenv').config();
var dataGuard;

var jwtMiddleWare = passport.authenticate('jwt', {session: false});

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

//profile
router.get('/users/profile/:id', [jwtMiddleWare, signatureSigner, dataGuard], UserController.getSingleProfile);
router.put('/users/profile/:id', [jwtMiddleWare, signatureSigner, dataGuard], UserController.editSingleProfile);

//audit-logs
router.get('/audit-logs/users', [jwtMiddleWare, signatureSigner, dataGuard], AuditController.getUsers);
// router.get('/audit-logs/users/:id', [jwtMiddleWare, signatureSigner, dataGuard], UserController.editSingleProfile);

//users
router.get('/users', [jwtMiddleWare, signatureSigner, dataGuard], UserController.getAllUsers);
router.get('/users/:id', [jwtMiddleWare, signatureSigner, dataGuard], UserController.getSingleUser);



module.exports = router;   