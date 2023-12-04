'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('wallets', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      account_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      account_number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bank_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      balance: {
        allowNull: true,
        type: Sequelize.DECIMAL(12, 2),
      },
      status: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('register_otps');
     */
     await queryInterface.dropTable('wallets');
  }
};
