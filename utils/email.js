'use strict'

const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport ({
	service: 'gmail',	
	host: 'smtp.gmail.com',
	port: 587,
  auth: {
     user: "sample2021.example@gmail.com",
     pass: "#sample1231#",
  },
	tls: {
    rejectUnauthorized: false
  }
})

module.exports = async (object) => {
  let mailer = await transporter.sendMail ({
  	 from: '',
  	 to: object.to,
  	 subject: object.subject,
  	 text: object.text,
  	 html: object.html,
  	 attachments: object.attachments || null
  })

  return mailer
}