
//const transporter = require('./mailer').transporter;
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  host:  process.env.MAIL_HOST,
  port:  process.env.MAIL_PORT,
  auth: {
    user:  process.env.MAIL_USERNAME,
    pass:  process.env.MAIL_PASSWORD
  },
  secure:false,
  tls: {rejectUnauthorized: false},
});

var option = {
    viewEngine : { 
        extname: '.hbs', // handlebars extension
        layoutsDir: __dirname+'/views/', // location of handlebars templates
        defaultLayout: 'transaction-pin-otp', // name of main template
    },
    viewPath: __dirname+'/views/',
    extName: '.hbs'
};

const send = async options => {

    await transporter.use('compile', hbs(option));

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: `${options.email}`,
      subject: "One-Time Passcode For Transaction Pin",
      template: 'transaction-pin-otp',
      context: {
        name: `${options.name}`,
        code: `${options.code}`,
      }
    };
  
    const info = await transporter.sendMail(message);
    return info;
}

module.exports = {send}


