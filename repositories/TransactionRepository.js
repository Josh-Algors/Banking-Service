const db = require("../database/db");
const bcrypt = require('bcryptjs');
const helpers = require("../config/helpers");

const getAllTransactions = async (user_id) => {

      const getRecentTransactions = await db.Transactions.findAll({where : {user_id: user_id}});

      if(!getRecentTransactions)
      {
            return;
      }

      return getRecentTransactions;
  
};

module.exports = {
    getAllTransactions,
};