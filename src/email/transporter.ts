import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ayomikuolatunji',
      pass: 'rfigetyfhzcincej'
    },
    tls:{
      rejectUnauthorized:false
    }
});

export default transporter