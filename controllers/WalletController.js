// const userService = require("../services/UserService");
// const helpers = require("../config/helpers");

// module.exports = {
//     hideBalance: async(req, res, next) => {
//         try{
//             await userService.hideBalance(req)
//             return res.status(200).json(helpers.sendSuccess("user balance visibility successfully changed"))
//         }catch(error){
//             if(error.status)
//                 return res.status(error.status).json(helpers.sendError(error.message, error.status))   
//         }
//     }

// }