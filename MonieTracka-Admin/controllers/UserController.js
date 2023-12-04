const userService = require("../services/UserService");
const helpers = require("../config/helpers");

module.exports = {


    getAllUsers: async (req, res, next) => {

        try
        {
            const userInfo =  await userService.allUsers();

            return res.status(200).json(helpers.sendSuccess("Info details returned successfully!", userInfo));
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

    getSingleUser: async (req, res, next) => {

        try
        {
            const userInfo =  await userService.singleUser(req);

            return res.status(200).json(helpers.sendSuccess("User details returned successfully!", userInfo));
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

    getSingleProfile: async (req, res, next) => {

        try
        {
            const userInfo =  await userService.singleProfile(req);

            return res.status(200).json(helpers.sendSuccess("User details returned successfully!", userInfo));
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


    editSingleProfile: async (req, res, next) => {

        try
        {
            await userService.updateProfile(req);

            return res.status(200).json(helpers.sendSuccess("User details updated successfully!"));
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