require('dotenv').config();
const axios = require('axios');
const res = require('express/lib/response');
const Joi = require('joi');
const userRepository = require("../repositories/UserRepository");
const adminRepository = require("../repositories/AdminRepository");
const helpers = require("../config/helpers");
const bcrypt = require('bcryptjs');

const createUser = async (req, res, next) => {

    const registerSchema = Joi.object().keys({
        email: Joi.string().required(),
        username: Joi.string().required(),
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
        return helpers.newError('Email already exists', 400);
    }

    const checkUsername = await userRepository.getUserByUsername(user.username);

    if(checkUsername)
    {
        return helpers.newError('Username already exists', 400);
    }

    const checkMobile = await userRepository.getUserByMobile(user.mobile);

    if(checkMobile)
    {
        return helpers.newError('Mobile number already exists', 400);
    }

    const userInfo = await userRepository.createUser(user);

    const otpInfo = await userRepository.createRegisterOtp(userInfo.id);

    await mailService.sendMail(userInfo.username, userInfo.email, otpInfo.code);

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

    const userInfo = await adminRepository.getUserByEmail(email);

    console.log(email);

    if(!userInfo)
    {
        return helpers.newError("No account found!", 404);
    }

    if (bcrypt.compareSync(password, userInfo.password))
    {
        // await userRepository.deleteUserTokenById(userInfo.id);

        const token = helpers.signToken(userInfo);
        // const time = helpers.getCurrentDateTime();

        // await mailService.loginNotify(userInfo.email, userInfo.username, time);

        return token;
    }

    return helpers.newError("Incorrect password", 401);
};

const allUsers = async (req, res, next) => {

    const info = await userRepository.getAllUsers();

    return info;
};


const singleUser = async (req, res, next) => {

    const info = await userRepository.getUserById(req.params.id);

    return info;
};


// singleProfile
const singleProfile = async (req, res, next) => {

    const userInfo = await userRepository.getUserById(req.params.id);
    const profileInfo = await userRepository.getProfileById(req.params.id);

    var data = {
        id: userInfo.id,
        email: userInfo.email,
        username: userInfo.username,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        mobile: userInfo.mobile,
        kyc_status: userInfo.kyc_status,
        image_url: (userInfo.image_url) ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        tier: (userInfo.tier) ?? "1",
        biometric_status: (userInfo.biometric_status) ?? 0,
        is_blocked: (userInfo.is_blocked) ?? 0,
        is_flagged: (userInfo.is_flagged) ?? 0,
        is_deleted: (userInfo.is_deleted) ?? 0,
        status: (userInfo.status) ?? 0,
        gender: profileInfo.gender,
        state: profileInfo.state,
        country: profileInfo.country,
        bvn: profileInfo.bvn,
        dob: profileInfo.dob
    };

    return data;
};

const updateProfile = async (req, res, next) => {

    const registerSchema = Joi.object().keys({
        email: Joi.string().optional(),
        username: Joi.string().optional(),
        mobile: Joi.string().optional(),
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
        kyc_status: Joi.string().optional(),
        image_url: Joi.string().optional(),
        tier: Joi.string().optional(),
        biometric_status: Joi.string().optional(),
        is_blocked: Joi.string().optional(),
        is_flagged: Joi.string().optional(),
        is_deleted: Joi.string().optional(),
        gender: Joi.string().optional(),
        state: Joi.string().optional(),
        country: Joi.string().optional(),
        dob: Joi.string().optional(),
        bvn: Joi.string().optional(),
    }).unknown();

    const validate = registerSchema.validate(req.body)

    if (validate.error != null) 
    {
        const errorMessage = validate.error.details.map(i => i.message).join('.');
        throw new Error(errorMessage);
    }

    const userInfo = await userRepository.getUserById(req.params.id);
    const profileInfo = await userRepository.getProfileById(req.params.id);

    var data = {
        id: req.user.id,
        email: (req.body.email) ?? userInfo.email,
        username: (req.body.username) ?? userInfo.username,
        firstname: (req.body.firstname) ?? userInfo.firstname,
        lastname: (req.body.lastname) ?? userInfo.lastname,
        mobile: (req.body.mobile) ?? userInfo.mobile,
        kyc_status: (req.body.kyc_status) ?? userInfo.kyc_status,
        image_url: (req.body.image_url) ?? userInfo.image_url,
        tier: (req.body.tier) ?? userInfo.tier,
        biometric_status: (req.body.biometric_status) ?? userInfo.biometric_status,
        is_blocked: (req.body.is_blocked) ?? userInfo.is_blocked,
        is_flagged: (req.body.is_flagged) ?? userInfo.is_flagged,
        is_deleted: (req.body.is_deleted) ?? userInfo.is_deleted,
        gender: (req.body.gender) ?? profileInfo.gender,
        state: (req.body.state) ?? profileInfo.state,
        country: (req.body.country) ?? profileInfo.country,
        bvn: (req.body.bvn) ?? profileInfo.bvn,
        dob: (req.body.dob) ?? profileInfo.dob
    };

    await userRepository.updateProfile(data);

    return;
};





module.exports = {
    createUser,
    loginAccount,
    allUsers,
    singleUser,
    singleProfile,
    updateProfile
};