const auditService = require("../services/AuditService");
const helpers = require("../config/helpers");

module.exports = {

    
    getUsers: async (req, res, next) => {

        try
        {
            const response = await auditService.getAllUsers(req);

            return res.status(200).json(helpers.sendSuccess("retrieved successfully!", response));
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