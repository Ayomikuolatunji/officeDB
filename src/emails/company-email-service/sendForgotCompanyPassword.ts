import  transporter from "../transporter";


const sendForgotCompanyPassword=(email:string,company:string,token:string)=>{
    const mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Hello ${company} your request to reset password was granted and you can click this link to reset the admin password`,
        html:`<body><h5>You can reset your admin pasword by clicking on the link</h5><div><a href='http://localhost:3000/${token}'>Login to your profile</a></div></body>`
      };
      // send email after successful signup
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      // 
}

export default sendForgotCompanyPassword