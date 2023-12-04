const db = require("../database/db");
const bcrypt = require('bcryptjs');
const helpers = require("../config/helpers");

const walletInfo = async (id) => {

      const wallet = await db.Wallet.findOne({where : {user_id: id}});

      if(!wallet)
      {
            return;
      }

      return wallet;
  
};




module.exports = {
      walletInfo,
};