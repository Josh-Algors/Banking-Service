const userService = require("../services/UserService");
const helpers = require("../config/helpers");

module.exports = {

    login: async (req, res, next) => {

        try
        {
            const response = await userService.loginAccount(req);

            return res.status(200).json(helpers.sendSuccess("Logged in successfully!", response));
        }
        catch(error)
        {
            if (error.status) 
            {
                return res.status(error.status).json(helpers.sendError(error.message, error.status));
            }

            return res.status(500).json(helpers.sendError(error.message, 500));
        }
    },
    

}