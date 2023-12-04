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
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    mobile: Sequelize.STRING,
    password: Sequelize.STRING,
    // image_url: Sequelize.STRING,
    status: Sequelize.INTEGER,
    transaction_pin: Sequelize.STRING
  })
}

module.exports = User;
