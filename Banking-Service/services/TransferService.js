require('dotenv').config();
const axios = require('axios');
const res = require('express/lib/response');
const Joi = require('joi');
const userRepository = require("../repositories/UserRepository");
const mailService = require("../services/MailService");
const helpers = require("../config/helpers");
const bcrypt = require('bcryptjs');
const MailMessage = require('nodemailer/lib/mailer/mail-message');
const { parse } = require('dotenv');

const verifyAccount = async (req, res, next) => {
    
    const registerSchema = Joi.object().keys({
        account_number: Joi.string().required(),
        bank_name: Joi.string().required(),
        amount : Joi.string().required
    }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        // const errorMessage = validate.error.details.map(i => i.message).join('.');
        // throw new Error(errorMessage);

        const errorDetails = validate.error.details;
        const fieldNames = errorDetails.map(detail => helpers.formatFieldName(detail.context.key));
        
        let errorMessage;
        if (fieldNames.length === 1) {
            errorMessage = `please send the ${fieldNames[0]}`;
        } else {
            const lastFieldName = fieldNames.pop();
            errorMessage = `please send the ${fieldNames.join(', ')} & ${lastFieldName}`;
        }

        throw new Error(errorMessage);
    }

    const {account_number, bank_name, amount} = req.body;

    const user = req.user;
    const checkUser = await userRepository.getUserById(user.id);

    if(!checkUser)
    {
        return helpers.newError('Unable to complete this request 😞', 400);
    }

    
    const checkWallet = await walletRepository.getUserInfo(account_number, bank_name);

    if(!checkWallet)
    {
        return helpers.sendData("We cant find any user with this record. Check the details and try again ☺️");
    }

    if(parseFloat(checkWallet.balance) < parseFloat(amount))
    {
        return helpers.sendData("Sorry, you dont have enough balance! Fund your account and try again");
    }

    const response =  "Hello " + checkUser.firstname + "! Just to be sure, you want to send " + parse(amount) + " Naira to " + bank_name + " account number - " + account_number + " with the account name " + checkWallet.account_name + " ?";

    return helpers.sendData(response, true, ["Yes", "No"]);

};

const continueVerify = async (req, res, next) => {
    
    const registerSchema = Joi.object().keys({
        response: Joi.string().required()
    }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        // const errorMessage = validate.error.details.map(i => i.message).join('.');
        // throw new Error(errorMessage);

        const errorDetails = validate.error.details;
        const fieldNames = errorDetails.map(detail => helpers.formatFieldName(detail.context.key));
        
        let errorMessage;
        if (fieldNames.length === 1) {
            errorMessage = `please send the ${fieldNames[0]}`;
        } else {
            const lastFieldName = fieldNames.pop();
            errorMessage = `please send the ${fieldNames.join(', ')} & ${lastFieldName}`;
        }

        throw new Error(errorMessage);
    }

    const {response} = req.body;

    const user = req.user;
    const checkUser = await userRepository.getUserById(user.id);

    if(!checkUser)
    {
        return helpers.newError('Unable to complete this request 😞', 400);
    }

    if(response == "yes")
    {
        const responses =  "Great! Kindly input your pin!"
        return helpers.sendData(responses, false, [], true);
    }

    if(response == "no")
    {
        const responses =  "What would you like us to do?"
        return helpers.sendData(responses, true, ["Yes", "No"]);
    }

};

const verifyPin = async (req, res, next) => {
    
    const registerSchema = Joi.object().keys({
        account_number: Joi.string().required(),
        bank_name: Joi.string().required(),
        amount : Joi.string().required,
        pin: Joi.string().required()
    }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        // const errorMessage = validate.error.details.map(i => i.message).join('.');
        // throw new Error(errorMessage);

        const errorDetails = validate.error.details;
        const fieldNames = errorDetails.map(detail => helpers.formatFieldName(detail.context.key));
        
        let errorMessage;
        if (fieldNames.length === 1) {
            errorMessage = `please enter the ${fieldNames[0]}`;
        } else {
            const lastFieldName = fieldNames.pop();
            errorMessage = `please enter the ${fieldNames.join(', ')} & ${lastFieldName}`;
        }

        throw new Error(errorMessage);
    }

    const {account_number, bank_name, amount, pin} = req.body;
    const user = req.user;
    const checkUser = await userRepository.getUserById(user.id);

    if(!checkUser)
    {
        return helpers.sendData("We are unable to process your request at this time! 😞");
    }
    
    const checkWallet = await walletRepository.getUserInfo(account_number, bank_name);

    if(!checkWallet)
    {
        return helpers.sendData("We cant find any user with this record. Check the details and try again ☺️");
    }

    if(parseFloat(checkWallet.balance) < parseFloat(amount))
    {
        return helpers.sendData("Sorry, you dont have enough balance! Fund your account and try again");
    }

    if (bcrypt.compareSync(pin, checkUser.transaction_pin))
    {
        // if(userInfo.status == 0)
        // {
        //     return helpers.newError("Account not activated", 400);
        // }

        // await walletRepository.updateTransaction(checkWallet.user_id, req.user.id);
        return helpers.sendData("Transaction Successful! Would you like to do anything else? 🤩", true, ["Yes" , "No", "Maybe"]);
    }

    return helpers.sendData("Incorrect pin! Please try the correct pin");
};

const sendMoney = async (req, res, next) => {
    
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
    verifyAccount,
    continueVerify,
    verifyPin,
    sendMoney
};