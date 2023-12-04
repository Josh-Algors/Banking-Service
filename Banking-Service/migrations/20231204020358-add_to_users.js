module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users', 'transaction_pin',
        {
           allowNull: true,
           type: Sequelize.STRING,
        },
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'transaction_pin')
    ]);
  }
};