var Sequelize = require('sequelize');

var ActivatedAccount = (sequelize, type) => {
  return sequelize.define('activated_accounts', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    type: Sequelize.STRING,
    tier: Sequelize.STRING,
    number: Sequelize.STRING,
    other_info: Sequelize.STRING,
    status: Sequelize.INTEGER,
  })
}

module.exports = ActivatedAccount;

