var Sequelize = require('sequelize');

var PasswordResetOtp = (sequelize, type) => {
  return sequelize.define('password_reset_otp', {
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

module.exports = PasswordResetOtp;
