const db = require("../database/db");
const bcrypt = require('bcryptjs');
const helpers = require("../config/helpers");

const getUserByEmail = async (email) => {

      const getUser = await db.User.findOne({where : {email: email}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

const getUserById = async (id) => {

      const getUser = await db.User.findOne({where : {id: id}, attributes: {exclude: ['password', 'transaction_pin']}});

      if(!getUser)
      {
            return helpers.newError("account not found!", 404);
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

const createUser = async (user) => {

      const newUser = await db.User.create({
           email: user.email,
           username: user.username,
           mobile: user.mobile,
           password: bcrypt.hashSync(user.password),
           status: 0
      });

      return newUser;
};

const getAllUsers = async () => {

      const getUsers = await db.User.findAll({attributes: {exclude: ['password', 'transaction_pin']}});

      if(!getUsers)
      {
            return;
      }

      return getUsers;
}

//getProfileById
const getProfileById = async (id) => {

      const getUser = await db.Profile.findOne({where : {user_id: id}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

//updateProfile
const updateProfile = async (data) => {

      const getInfo = await getUserById(data.id);

      if(!getInfo)
      {
            return helpers.newError("Unable to complete this request! Try again Later", 400);
      }

      const getUser = await getProfileById(data.id);

      if(!getUser)
      {
            return helpers.newError("Unable to complete this request! Try again Later", 400);
      }

      await db.User.update({
            email: data.email,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            mobile: data.mobile,
            kyc_status: data.kyc_status,
            image_url: (data.image_url),
            tier: data.tier,
            biometric_status: data.biometric_status,
            is_blocked: data.is_blocked,
            is_flagged: data.is_flagged,
            is_deleted: data.is_deleted
      },
            {where : {id : data.id}
      });

      await db.Profile.update({
            gender: data.gender,
            state: data.state,
            country: data.country,
            bvn: data.bvn,
            dob: data.dob
      },
            {where : {user_id : data.id}
      });

      return;
};

module.exports = {
      getUserByEmail,
      getUserById,
      createUser,
      getUserByMobile,
      getUserByUsername,
      getAllUsers,
      getProfileById,
      updateProfile
};