var Sequelize = require('sequelize');

var Film = (sequelize, type) => {
  return sequelize.define('films', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    release_date: Sequelize.DATEONLY,
    comment_count: Sequelize.STRING
  })
}

module.exports = Film;
