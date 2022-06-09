import transporter from "../transporter";


const sendResetEmployeeEmail=(email:string, id:number, token:string)=>{
      var mailOptions = {
      from: 'ayomikuolatunji@gmail.com',
      to: email,
      subject: 'Ayoscript from onlineoffice.com',
      text: `Your request to change password with ${email} is sent `,
      html:`<body><h5>You set your password with the link below</h5><div><a href='http://localhost:3000/forgot-password/new-password?code=${token}&id=${id}'>Click to correct password</a></div></body>`
    };
    // send email after successful signup
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

export default sendResetEmployeeEmail