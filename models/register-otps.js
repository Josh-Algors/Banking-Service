var Sequelize = require('sequelize');

var RegisterOtp = (sequelize, type) => {
  return sequelize.define('register_otps', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    code: Sequelize.STRING,
    status: Sequelize.INTEGER
  })
}

module.exports = RegisterOtp;
