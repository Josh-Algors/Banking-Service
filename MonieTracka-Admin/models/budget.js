var Sequelize = require('sequelize');

var ActivatedAccount = (sequelize, type) => {
  return sequelize.define('budgets', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    type: Sequelize.STRING,
    category: Sequelize.STRING,
    amount_funded: Sequelize.STRING,
    main_balance: Sequelize.DECIMAL(12, 2),
    available_balance: Sequelize.DECIMAL(12, 2),
    start_date: Sequelize.STRING,
    end_date: Sequelize.STRING,
    cycle: Sequelize.STRING,
    next_billing_date: Sequelize.STRING, 
    period: Sequelize.STRING,
    status: Sequelize.INTEGER,
  })
}

module.exports = ActivatedAccount;

