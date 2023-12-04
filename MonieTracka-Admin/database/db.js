require('dotenv').config();
var Sequelize = require('sequelize');

//Connect to DB
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
      timestamps: false, // true by default
      freezeTableName: true
  }
});

//Check connection to DB
sequelize.authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
});

const db = {};

//initialize models
db.Oauth = require('../models/oauth')(sequelize, Sequelize);
db.User = require('../models/user')(sequelize, Sequelize);
db.RegisterOtp = require('../models/register-otps')(sequelize, Sequelize);
db.PasswordResetOtp = require('../models/password-reset-otp')(sequelize, Sequelize);
db.Wallet = require('../models/wallet')(sequelize, Sequelize);
db.Profile = require('../models/profile')(sequelize, Sequelize);
db.Transaction = require('../models/main_transaction')(sequelize, Sequelize);
db.TransactionLog = require('../models/transaction_log')(sequelize, Sequelize);
db.TransactionPinOtp = require('../models/pin_activation_otp')(sequelize, Sequelize);
db.ActivatedAccount = require('../models/activated_account')(sequelize, Sequelize);
db.AccountUpgradeOtp = require('../models/account_upgrade_otp')(sequelize, Sequelize);
db.Admin = require('../models/admin')(sequelize, Sequelize);

db.sequelize = sequelize;
 
//export models
module.exports = db;