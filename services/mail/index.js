const nodemailer = require('nodemailer');
const { email, email_password, frontend_url } = require('../../config/vars');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: email_password,
  },
});

const sendMailToUsers = (users) => {
  users.forEach((user) => {
    // console.log(user.email);
    const mailOptions = {
      from: email,
      to: user.email,
      subject: 'Your Account has been Create on Payrool.com',
      html: `<h3>Hello ${user.name}</h3>
              <p>your user code is ${user.user_code}</p>
              <p>your password is ${user.password}</p>
              <p>Use <a href = "${frontend_url}/${user.company_name}.payrool.com">this</a> link to signin into your Account</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
};
exports.sendMailForPasswordChange = (user) => {
  const mailOptions = {
    from: email,
    to: user.email,
    subject: 'Otp for password changed',
    html: `<h3>Hello ${user.name}</h3>
            <p>your request to change password has been accepted.</p>
            <p>Use this otp ->  ${user.otp} to change your Password</p>
            <p>This otp will expire in 5 minutes.</p>
            <p>Dont Share this with anyone.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
exports.sendMailToUsers = sendMailToUsers;
