var Sequelize = require('sequelize');

var Transaction = (sequelize, type) => {
  return sequelize.define('transactions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    transaction_id: Sequelize.STRING,
    amount: Sequelize.STRING,
    charge: Sequelize.STRING,
    balance: Sequelize.DECIMAL(12, 2),
    description: Sequelize.STRING,
    recipient_account_number: Sequelize.STRING,
    recipient_account_name: Sequelize.STRING,
    recipient_bank_name: Sequelize.STRING,
    status: Sequelize.STRING,
  })
}

module.exports = Transaction;
