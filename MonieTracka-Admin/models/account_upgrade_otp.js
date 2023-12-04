var Sequelize = require('sequelize');

var AccountUpgradeOtp = (sequelize, type) => {
  return sequelize.define('account_upgrade_otp', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    number: Sequelize.STRING,
    tier: Sequelize.STRING,
    code: Sequelize.STRING,
    status: Sequelize.INTEGER
  })
}

module.exports = AccountUpgradeOtp;
