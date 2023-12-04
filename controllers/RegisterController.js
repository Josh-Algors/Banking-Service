// const userService = require("../services/UserService");
// const helpers = require("../config/helpers");

// module.exports = {


//     registerUser: async (req, res, next) => {

//         try
//         {
//             await userService.createUser(req);

//             return res.status(200).json(helpers.sendSuccess("Code has been sent to your account!"));
//         }
//         catch(error)
//         {
//             if (error.status) 
//             {
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status));
//             }

//             return res.status(500).json(helpers.sendError(error.message, 500));
//         }
//     },

//     activateAccount: async (req, res, next) => {

//         try
//         {
//             const response = await userService.activateAccount(req);

//             return res.status(200).json(helpers.sendSuccess("Account activated successfully!", response));
//         }
//         catch(error)
//         {
//             if (error.status) 
//             {
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status));
//             }

//             return res.status(500).json(helpers.sendError(error.message, 500));
//         }
//     },

//     resendCode: async (req, res, next) => {
//         try
//         {
//             const response = await userService.resendOtp(req);

//             return res.status(200).json(helpers.sendSuccess("Code has been sent to your account!", response));
//         }
//         catch(error)
//         {
//             if (error.status) 
//             {
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status));
//             }

//             return res.status(500).json(helpers.sendError(error.message, 500));
//         }
//     },

//     forgotPassword: async (req, res, next) => {

//         try
//         {
//             const response = await userService.forgotPassword(req);

//             return res.status(200).json(helpers.sendSuccess("Code has been sent to your email/phone number!", response));
//         }
//         catch(error)
//         {
//             if (error.status) 
//             {
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status));
//             }

//             return res.status(500).json(helpers.sendError(error.message, 500));
//         }
//     },

//     validateForgotCode: async (req, res, next) => {

//         try
//         {
//             const response = await userService.validateResetCode(req);

//             return res.status(200).json(helpers.sendSuccess("Code validated successfully!", response));
//         }
//         catch(error)
//         {
//             if (error.status) 
//             {
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status));
//             }

//             return res.status(500).json(helpers.sendError(error.message, 500));
//         }
//     },

//     changePassword: async (req, res, next) => {

//         try
//         {
//             const response = await userService.changePassword(req);

//             return res.status(200).json(helpers.sendSuccess("Password has been changed successfully!", response));
//         }
//         catch(error)
//         {
//             if (error.status) 
//             {
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status));
//             }

//             return res.status(500).json(helpers.sendError(error.message, 500));
//         }
//     },

// }