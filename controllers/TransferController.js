const userService = require("../services/UserService");
const transferService = require("../services/TransferService");
const helpers = require("../config/helpers");

module.exports = {


    verifyAccount: async (req, res, next) => {

        try
        {
            const userInfo =  await transferService.verifyAccount(req);

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

    continueVerify: async (req, res, next) => {

        try
        {
            const userInfo =  await transferService.continueVerify(req);

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

    verifyPin: async (req, res, next) => {

        try
        {
            const userInfo =  await transferService.verifyPin(req);

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

    sendMoney: async (req, res, next) => {

        try
        {
            const userInfo =  await transferService.sendMoney(req);

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


}