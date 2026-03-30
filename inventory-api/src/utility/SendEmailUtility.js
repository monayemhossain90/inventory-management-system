var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {
    
    //transporter
    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL || '',
            pass: process.env.SMTP_PASSWORD || '',
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    let mailOptions = {
        from: 'Inventory management system <monayemhossain347@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility
