import transporter from "../transporter";


const sendCorrectEmployeePasswordEmail=(email:string)=>{
    var mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Your request to change password with ${email} is sucessful `,
        html:`<body><h5>Your password has been reset </h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>`
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

export default sendCorrectEmployeePasswordEmail