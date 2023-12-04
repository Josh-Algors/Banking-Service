require('dotenv').config();
const axios = require('axios');
const res = require('express/lib/response');
const Joi = require('joi');
const userRepository = require("../repositories/UserRepository");
const adminRepository = require("../repositories/AdminRepository");
const helpers = require("../config/helpers");
const bcrypt = require('bcryptjs');


const getAllUsers = async (req, res, next) => {

    const info = await userRepository.getAllUsers();

    return info;
};






module.exports = {
    getAllUsers
};