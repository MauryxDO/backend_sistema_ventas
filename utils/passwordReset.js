import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'mau03041@gmail.com', // generated ethereal user
      pass: 'mleqsnmrxznviloy', // generated ethereal password
    },
});

transporter.verify().then(()=>{
})