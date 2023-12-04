const db = require("../database/db");
const bcrypt = require('bcryptjs');
const helpers = require("../config/helpers");

const getUserByEmail = async (email) => {

      const getUser = await db.Admin.findOne({where : {email: email}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

const getUserById = async (id) => {

      const getUser = await db.User.findOne({where : {id: id}, attributes: {exclude: ['password']}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

const getUserByUsername = async (username) => {

      const getUser = await db.User.findOne({where : {username: username}, attributes: {exclude: ['password']}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

const getUserByMobile = async (mobile) => {

      const getUser = await db.User.findOne({where : {mobile: mobile}, attributes: {exclude: ['password']}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};


module.exports = {
      getUserByEmail,
      getUserById,
      getUserByMobile,
      getUserByUsername
      
};