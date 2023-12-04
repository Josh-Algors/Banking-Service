var Sequelize = require('sequelize');

var Admin = (sequelize, type) => {
  return sequelize.define('admins', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    status: Sequelize.INTEGER,
  })
}

module.exports = Admin;
