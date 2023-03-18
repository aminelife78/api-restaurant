const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Créer un transporteur (service qui enverra des e-mails comme "gmail","Mailgun", "mailtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Définir les options d'e-mail (comme de, à, objet, contenu de l'e-mail)
  const mailOpts = {
    from: options.mail,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html:options.html,
  };
  //  3) envoyer e-mail
  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;
