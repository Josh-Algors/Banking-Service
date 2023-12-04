const userService = require("../services/UserService");
const helpers = require("../config/helpers");

module.exports = {


    registerUser: async (req, res, next) => {

        try
        {
            var registerUser = await userService.createUser();

            return res.status(200).json(helpers.sendSuccess("User registered successfully!", registerUser));
        }
        catch(error)
        {
            return res.status(500).json(helpers.sendError("Internal error occurred!"));
        }
    },


}