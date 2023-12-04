const axios = require('axios');
const res = require('express/lib/response');
const Joi = require('joi');
const userRepository = require("../repositories/UserRepository");
const otpMail = require('../mailer/registerOtp');
const resetPasswordMail = require('../mailer/forgotMail');
const resetSuccessMail = require('../mailer/resetSuccess');

const sendMail = async (firstname, email, code) => {

    const mail = {
        email: email.toLowerCase(),
        code: code,
        name: firstname,
      };

      try {
        //dispatch email
        otpMail.send(mail);
      }
      catch (e) { }
    
};

const forgotMail = async (firstname, email, code) => {

    const mail = {
        email: email.toLowerCase(),
        code: code,
        name: firstname,
      };

      try {
        // dispatch email
        resetPasswordMail.send(mail);
      }
      catch (e) { }
    
};

const resetSuccess = async (firstname, email) => {

    const mail = {
        email: email.toLowerCase(),
        name: firstname,
      };

      try {
        // dispatch email
        resetSuccessMail.send(mail);
      }
      catch (e) { }
    
};

module.exports = {
    sendMail,
    forgotMail,
    resetSuccess
};