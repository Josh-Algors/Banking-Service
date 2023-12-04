var Sequelize = require('sequelize');

var Wallet = (sequelize, type) => {
  return sequelize.define('wallets', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    account_name: Sequelize.STRING,
    account_number: Sequelize.STRING,
    bank_name: Sequelize.STRING,
    balance: Sequelize.DECIMAL(12, 2),
    status: Sequelize.INTEGER,
    hide_status: Sequelize.STRING
  })
}

module.exports = Wallet;
