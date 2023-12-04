const sendError = message => {
    var error = {
        "error": {
            "status": "ERROR",
            "message": message
        }
    }

    return error;
}

const sendSuccess = (message, data = undefined) => {
    var success = {
        "success": {
            "status": "SUCCESS",
            "message": message,
            "data": data
        }
    }

    return success;
}


module.exports = {
    sendError,
    sendSuccess
};