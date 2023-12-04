// const userService = require("../services/UserService");
// const helpers = require("../config/helpers");

// module.exports = {


//     dashboard: async (req, res, next) => {

//         try
//         {
//             const userInfo =  await userService.dashboardInfo(req);

//             return res.status(200).json(helpers.sendSuccess("Info details returned successfully!", userInfo));
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

//     getProfile: async (req, res, next) => {

//         try
//         {
//             const userInfo =  await userService.getProfile(req);

//             return res.status(200).json(helpers.sendSuccess("Profile details returned successfully!", userInfo));
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

//     updateProfile: async (req, res, next) => {

//         try
//         {
//             await userService.updateProfile(req);

//             return res.status(200).json(helpers.sendSuccess("Profile details updated successfully!"));
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


//     setTrasactionPin: async(req, res, next) => {
//         try{
//             // const { transactionPin, _id } = req.body
//           await userService.setTransactionPin(req)  
//           helpers.sendSuccess("Transaction pin successfully updated", 204)
          
//         }catch(error){
//             if(error.status)
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status))
//         }
//     },


//     viewBalance: async(req, res, next) => {
//         try{
//             await userService.viewBalance(req)
//             return res.status(200).json(helpers.sendSuccess("user balance visibility successfully changed"))
//         }catch(error){
//             if(error.status)
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status))   
//         }
//     }

// }