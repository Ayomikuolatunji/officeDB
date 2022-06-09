import  transporter from "./transporter";


const sendCompanyReqEmail=(email:string,name:string)=>{
    const mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Hello ${name} your account with this ${email} is created sucess fully successfully`,
        html:"<body><h5>You can login to your app with the link below</h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>"
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

export default sendCompanyReqEmail