const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const db  = require('../database/db');
const { text } = require('body-parser');


function formatFieldName(fieldName) {
    return fieldName.replace(/_/g, ' ');
}

const sendError = (message, code) => {
    var error = {
        "status": "ERROR",
        "code": code,
        "message": message
    }

    return error;
}

const sendSuccess = (message, data = undefined) => {
    var success = {
        "status": "SUCCESS",
        "code": 200,
        "message": message,
        "data": data
    }

    return success;
}

const newError = (message, code) => {

    const error = new Error(message);
    error.status = code;
    throw error;

}

function generateOtp(length = 4)
{
    var result           = '';
    var characters       = '123456789123456789123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const sendData = (response, options=false, values=[], hide=false) => {
    var data = {
        "response": response,
        "options": options,
        "values": values,
        "isHidden": hide
    }

    return data;
}

const signToken = (user) => {

    var token = jwt.sign({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
      process.env.SECRET,
      {
        expiresIn: process.env.SESSION, //1800
      }
    );
  
    var decoded = jwt_decode(token);
    db.Oauth.create(decoded);
    return token;
}


module.exports = {
    sendError,
    sendSuccess,
    generateOtp,
    newError,
    signToken,
    formatFieldName,
    sendData
};