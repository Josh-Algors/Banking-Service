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

      console.log("here!!!");
      const getUser = await db.User.findOne({where : {id: id}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

const getUserByMobile = async (mobile) => {

      const getUser = await db.User.findOne({where : {mobile: mobile}});

      if(!getUser)
      {
            return;
      }

      return getUser;
  
};

const createUser = async (user) => {

      const newUser = await db.User.create({
           email: user.email,
           firstname: user.firstname,
           lastname: user.lastname,
           mobile: user.mobile,
           password: bcrypt.hashSync(user.password),
           status: 0
      });

      return newUser;
};

const createRegisterOtp = async (user_id) => {

      const otp = helpers.generateOtp();

      const newRegisterOtp = await db.RegisterOtp.create({
           user_id: user_id,
           code: otp,
           status: 0,
      });

      return newRegisterOtp;
  
};

const getCodebyEmail = async (email) => {

      const getUserId = await getUserByEmail(email);

      if(!getUserId)
      {
            return;
      }

      const newRegisterOtp = await db.RegisterOtp.findOne({
           where : {user_id : getUserId.id, status : 0},
           order: [['id', 'DESC']]
      });

      if(!newRegisterOtp)
      {
            return;
      }

      return newRegisterOtp;
};

const activateEmail = async (email) => {
      
      const getUserId = await getUserByEmail(email);

      if(!getUserId)
      {
            return;
      }

      await db.User.update({
            status: 1 },
            {where : {email : email},
       });
};

const createResetOtp = async (user_id) => {

      const otp = helpers.generateOtp();

      const newResetOtp = await db.PasswordResetOtp.create({
           user_id: user_id,
           code: otp,
           status: 0,
      });

      return newResetOtp;
  
};

const validateResetCode = async (email, code) => {
      
      const getUserId = await getUserByEmail(email);

      if(!getUserId)
      {
            return;
      }

      const checkCodeStatus = await db.PasswordResetOtp.findOne({
            where : {user_id : getUserId.id, code: code, status: 0},
            order: [['id', "DESC"]]
       });

      if(!checkCodeStatus)
      {
            return;
      }

      return checkCodeStatus;
};

const updateResetStatus = async (email, code) => {

      const userInfo = await getUserByEmail(email);

      if(!userInfo)
      {
            return;
      }
      
      const validateCodeStatus = await validateResetCode(email, code);

      if(!validateCodeStatus)
      {
            return;
      }

      const updatedCodeStatus = await db.PasswordResetOtp.update({
            status: 1 },
            {where : {user_id : userInfo.id, code: code},
            order: [['id', "DESC"]]
       });

      return updatedCodeStatus;
};

const updatePassword = async (email, password) => {

      const userInfo = await getUserByEmail(email);

      if(!userInfo)
      {
            return;
      }

      const changePassword = await db.User.update({
            password: bcrypt.hashSync(password) },
            {where : {id : userInfo.id}
       });

      return changePassword;
};

const updateProfile = async (data, user_id) => {

      const userInfo = await getUserById(user_id);

      if(!userInfo)
      {
            return;
      }

      var email = (data.email) ? data.email : userInfo.email;
      var firstname = (data.firstname) ? data.firstname : userInfo.firstname;
      var lastname = (data.lastname) ? data.lastname : userInfo.lastname;
      var mobile = (data.mobile) ? data.mobile : userInfo.mobile;
 
      const updatedInfo = await db.User.update({
            email: email,  
            firstname: firstname,
            lastname: lastname,
            mobile: mobile
      },
            {where : {id : userInfo.id}
       });

      return updatedInfo;
};

const updateTransactionPin = async (email, pin) => {

      const userInfo = await getUserByEmail(email);

      if(!userInfo) return;
      
      const updatedPin = await db.User.update(
      {
            transaction_pin: pin },
            {where : {id : userInfo.id}
      });

      return updatedPin;
};

const hideBalance = async(email, balanceView) => {
      const userInfo = await getUserByEmail(email)

      if(!userInfo) return;

      const updatedPin = await db.Wallet.update(
      {
            hide_status: balanceView },
            {where : {id : userInfo.id}
      });

      return updatedPin;
}

module.exports = {
      getUserByEmail,
      getUserById,
      createUser,
      createRegisterOtp,
      getCodebyEmail,
      activateEmail,
      getUserByMobile,
      createResetOtp,
      validateResetCode,
      updateResetStatus,
      updatePassword,
      updateProfile,
      updateTransactionPin,
      hideBalance
};