var Sequelize = require('sequelize');

var Profile = (sequelize, type) => {
  return sequelize.define('profiles', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    gender: Sequelize.STRING,
    state: Sequelize.STRING,
    country: Sequelize.STRING,
    status: Sequelize.STRING,
  })
}

module.exports = Profile;
