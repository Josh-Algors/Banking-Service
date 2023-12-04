const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const db  = require('../database/db');
const userRepository = require('../repositories/UserRepository');
const { date } = require('joi');

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


//generateTransactionId
function generateTransactionId(length = 10)
{
    var result           = '';
    var characters       = '123456789012345678901234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getCurrentDateTime()
{
    const timeZone = process.env.TIMEZONE;

    const currentDate = new Date();
    const options = { timeZone, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);

    return formattedDate;
}


function displayGreetings(data)
{
    var current_date = new Date();
    var current_time = current_date.getHours();
    var time_day = ""

    if(current_time > 0 && current_time < 12)
    {
        time_day = "Morning 🌞";
    }
    else if(current_time > 11 && current_time < 17)
    {
        time_day = "Afternoon 🌕";
    }
    else if(current_time > 16 && current_time < 24)
    {
        time_day = "Evening 🌑";
    }
    else
    {
        time_day = "Day"
    }
    const greetings = "Good " + time_day + ", " + capitalizeFirstLetter(data.username) + "!";

    return greetings;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function generateAccountNumber(length = 10)
{
    var result           = '';
    var characters       = '123456789012345678901234567890';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const signToken = (user) => {

    var token = jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      admin: 1
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

function base64_decode(base64string)
{
    let bufferObj = Buffer.from(base64string, "base64");
    let decodedString = bufferObj.toString("utf8");
    return decodedString;
}

function base64_encode(originalString)
{
    let bufferObj = Buffer.from(originalString, "utf8");
    let base64String = bufferObj.toString("base64");
    return base64String;
}


module.exports = {
    sendError,
    sendSuccess,
    generateOtp,
    newError,
    signToken,
    displayGreetings,
    capitalizeFirstLetter,
    generateTransactionId,
    base64_decode,
    base64_encode,
    getCurrentDateTime,
    generateAccountNumber
};