var Sequelize = require('sequelize');

var PinActivationOtp = (sequelize, type) => {
  return sequelize.define('pin-activation-otps', {
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

module.exports = PinActivationOtp;
