var Sequelize = require('sequelize');

var User = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    mobile: Sequelize.STRING,
    password: Sequelize.STRING,
    kyc_status: Sequelize.STRING,
    image_url: Sequelize.STRING,
    tier: Sequelize.INTEGER,
    biometric_status: Sequelize.INTEGER,
    is_blocked: Sequelize.INTEGER,
    is_flagged: Sequelize.INTEGER,
    transaction_pin: Sequelize.STRING,
    is_deleted: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
  })
}

module.exports = User;
