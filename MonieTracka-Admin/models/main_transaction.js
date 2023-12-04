var Sequelize = require('sequelize');

var MainTransaction = (sequelize, type) => {
  return sequelize.define('main_transactions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    transaction_id: Sequelize.STRING,
    transaction_type: Sequelize.STRING,
    amount: Sequelize.STRING,
    balance: Sequelize.STRING,
    recipient_account_name: Sequelize.STRING,
    recipient_account_number: Sequelize.STRING,
    recipient_bank_name: Sequelize.STRING,
    description: Sequelize.STRING,
    category: Sequelize.STRING,
    transfer_type: Sequelize.STRING,
    status: Sequelize.INTEGER,
  })
}

module.exports = MainTransaction;