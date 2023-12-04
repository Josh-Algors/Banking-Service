require('dotenv').config();
const axios = require('axios');
const res = require('express/lib/response');
const Joi = require('joi');
const userRepository = require("../repositories/UserRepository");
const mailService = require("../services/MailService");
const helpers = require("../config/helpers");
const bcrypt = require('bcryptjs');
const MailMessage = require('nodemailer/lib/mailer/mail-message');

const walletInfo = async (req, res, next) => {
    
    const user = req.body;
    const checkUser = await userRepository.getUserByEmail(user.email);

    if(checkUser)
    {
        return helpers.newError('User already exists', 400);
    }

    const userInfo = await userRepository.createUser(user);

    const otpInfo = await userRepository.createRegisterOtp(userInfo.id);

    await mailService.sendMail(userInfo.firstname, userInfo.email, otpInfo.code);

    return;
    
};


module.exports = {
    walletInfo,
};