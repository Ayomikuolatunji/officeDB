import transporter from "../transporter";


const sendDeleteEmployeeEmail=(email:string, username:string,company_name:string)=>{
     // send emails after deleting account
     var mailOptions = {
        from: 'ayomikuolatunji@gmail.com',
        to: email,
        subject: 'Ayoscript from onlineoffice.com',
        text: `Hello ${username} your account with this ${email} deactivated permanently`,
        html:`<body><h5>You deleted your account with ${company_name} and you are no longer with the company on our platformz</h5></body>`
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

export default sendDeleteEmployeeEmail