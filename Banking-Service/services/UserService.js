require('dotenv').config();
const axios = require('axios');
const res = require('express/lib/response');
const Joi = require('joi');
const userRepository = require("../repositories/UserRepository");
const walletRepository = require("../repositories/WalletRepository");
const transactionRepository = require("../repositories/TransactionRepository");
const mailService = require("../services/MailService");
const helpers = require("../config/helpers");
const bcrypt = require('bcryptjs');
const MailMessage = require('nodemailer/lib/mailer/mail-message');

const createUser = async (req, res, next) => {

    const registerSchema = Joi.object().keys({
        email: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        mobile: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }
    
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

const activateAccount = async (req, res, next) => {

    const registerSchema = Joi.object().keys({
        email: Joi.string().required(),
        code: Joi.string().required()
      }).unknown();
  
      const validate = registerSchema.validate(req.body)

      if (validate.error != null) 
      {
            const errorMessage = validate.error.details.map(i => i.message).join('.');
            throw new Error(errorMessage);
      }

      const info = req.body;
      const checkUser = await userRepository.getUserByEmail(info.email);
      const checkCode = await userRepository.getCodebyEmail(info.email);

      if(!checkUser)
      {
        return helpers.newError("No account found!", 400);
      }

      if(!checkCode)
      {
          await this.resendOtp(info.email);

          return helpers.newError("A new Otp has been sent to your mail", 200);
      }

      if(checkCode.code != info.code)
      {
        return helpers.newError("Invalid code", 400);
      }

      const userInfo = await userRepository.getUserByEmail(info.email);
      await userRepository.activateEmail(info.email);
      const token = helpers.signToken(userInfo);

      return token;

};

const resendOtp = async (req, res, next) => {

    const registerSchema = Joi.object().keys({
        email: Joi.string().required()
      }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    const email = req.body.email;

    const getUserId = await userRepository.getUserByEmail(email);

    if(!getUserId)
    {
        return helpers.newError("No account found!", 404);
    }

    const otpInfo = await userRepository.createRegisterOtp(getUserId.id);

    await mailService.sendMail(getUserId.firstname, getUserId.email, otpInfo.code);

    return;

};

const loginAccount = async (req, res, next) => {
    const registerSchema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    const {email, password} = req.body;

    const userInfo = await userRepository.getUserByEmail(email);

    if(!userInfo)
    {
        return helpers.newError("No account found!", 404);
    }

    if (bcrypt.compareSync(password, userInfo.password))
    {
        // if(userInfo.status == 0)
        // {
        //     return helpers.newError("Account not activated", 400);
        // }

        const token = helpers.signToken(userInfo);

        return token;
    }

    return helpers.newError("Incorrect password", 400);
};

const forgotPassword = async (req, res, next) => {
    const registerSchema = Joi.object().keys({
        email_or_mobile: Joi.string().required(),
      }).unknown();
  
    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    const account_info = req.body;

    const userInfoByEmail = await userRepository.getUserByEmail(account_info.email_or_mobile);
    const userInfoByMobile = await userRepository.getUserByMobile(account_info.email_or_mobile);


    if(!userInfoByEmail && !userInfoByMobile)
    {
        return helpers.newError("No account found!", 404);
    }

    if(userInfoByEmail)
    {
        const createOtp = await userRepository.createResetOtp(userInfoByEmail.id);
        await mailService.forgotMail(userInfoByEmail.firstname, userInfoByEmail.email, createOtp.code);
        return userInfoByEmail.email;
    }

    if(userInfoByMobile)
    {
        const createOtp = await userRepository.createResetOtp(userInfoByMobile.id);
        await mailService.forgotMail(userInfoByMobile.firstname, userInfoByMobile.email, createOtp);
        return userInfoByEmail.email;
    }

    return;
};

const validateResetCode = async (req, res, next) => {
    const resetPasswordSchema = Joi.object().keys({
        email: Joi.string().required(),
        code: Joi.string().required(),
      }).unknown();
  
    const validate = resetPasswordSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    const account_info = req.body;

    const userInfoByEmail = await userRepository.getUserByEmail(account_info.email);

    if(!userInfoByEmail)
    {
        return helpers.newError("No account found!", 404);
    }

    if(userInfoByEmail)
    {
        const validateStatus = await userRepository.updateResetStatus(account_info.email, account_info.code);

        if(!validateStatus)
        {
            return helpers.newError("Invalid Request", 400);
        }

        return;
    }

    return helpers.newError("Incorrect password", 400);
};

const changePassword = async (req, res, next) => {
    const resetPasswordSchema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      }).unknown();
  
    const validate = resetPasswordSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    if(req.query.key != process.env.KEY)
    {
        return helpers.newError("Unable to change password!", 400);
    }

    const account_info = req.body;

    const userInfoByEmail = await userRepository.getUserByEmail(account_info.email);

    if(!userInfoByEmail)
    {
        return helpers.newError("No account found!", 404);
    }

    if(userInfoByEmail)
    {
        const validateStatus = await userRepository.updatePassword(account_info.email, account_info.password);

        if(!validateStatus)
        {
            return helpers.newError("Unable to change password at this time! Kindly try again", 400);
        }

        await mailService.resetSuccess(userInfoByEmail.firstname, userInfoByEmail.email);
        return;
    }

    return helpers.newError("Incorrect password", 400);
}

const dashboardInfo = async (req) => {

    const userInfo = await userRepository.getUserById(req.user.id);

    if(!userInfo)
    {
        return helpers.newError("No account found!", 404);
    }

    var walletInfo = await walletRepository.walletInfo(req.user.id);

    if(!walletInfo)
    {
        walletInfo = {
            account_number: "",
            account_name: "",
            bank_name: ""
        }
    }

    var transactions = await transactionRepository.getAllTransactions(req.user.id);

    if(!transactions)
    {
        transactions = [];
    }

    const data = {
        user_info : {
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            mobile: userInfo.mobile,
            image_url: (userInfo.image_url) ? userInfo.image_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        wallet_info: {
            account_number: walletInfo.account_name,
            account_name: walletInfo.account_number,
            bank_name: walletInfo.bank_name,
            balance: walletInfo.balance
        },
        transactions: transactions
    }

    return data; 
};

const getProfile = async (req) => {

    const userInfo = await userRepository.getUserById(req.user.id);

    if(!userInfo)
    {
        return helpers.newError("Invalid request!", 400);
    }

    const data = {
        user_info : {
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            mobile: userInfo.mobile,
            image_url: (userInfo.image_url) ? userInfo.image_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
    }

    return data; 
};

const updateProfile = async (req) => {

    const userInfo = await userRepository.getUserById(req.user.id);

    if(!userInfo)
    {
        return helpers.newError("No account found!", 404);
    }

    const resetPasswordSchema = Joi.object().keys({
        email: Joi.string().optional(),
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
        mobile: Joi.string().optional(),
        image: Joi.string().optional(),
      }).unknown();
  
    const validate = resetPasswordSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    const data = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
    }
    const updateUserInfo = await userRepository.updateProfile(data, req.user.id);

    return updateUserInfo; 
}


const setTransactionPin = async (req) => {
   const updatedTransactionPin =  await userRepository.updateTransactionPin(req.email, req.transactionPin)
   if(!updatedTransactionPin)
    return helpers.newError("Could not update transaction pin", 400) 
   
   return updatedTransactionPin
}

const hideBalance = async (req) => {
    const viewUserBalance =  await userRepository.hideBalance(req.email, req.balanceView)
    if(!viewUserBalance)
      return helpers.newError("Can not hide balance", 400) 
    
    return viewUserBalance
}



module.exports = {
    createUser,
    activateAccount,
    resendOtp,
    loginAccount,
    forgotPassword,
    validateResetCode,
    changePassword,
    dashboardInfo,
    getProfile,
    updateProfile,
    setTransactionPin,
    hideBalance
};