import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "HIT",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  const emailBodyHTML = mailGenerator.generate(options.mailGenContent);
  const emailBodyText = mailGenerator.generatePlaintext(options.mailGenContent);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const email = {
    from: process.env.SMTP_EMAIL_FROM, // sender address
    to: options.toEmail, // list of receivers
    subject: options.subject, // Subject line
    text: emailBodyText, // plain text body
    html: emailBodyHTML, // html body
  };
  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error("error occur :", error);
  }
};

const emailVerificationMailGeneration = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to HIT! We're very excited to have you on board.",
      action: {
        instructions: "To get verified your email, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
export { sendMail, emailVerificationMailGeneration };

// =================use=================
//   sendMail({
//     toEmail: "dip@gmail.com",
//     subject: "please verify your email",
//     mailGenContent: emailVerificationMailGeneration(
//       "dip kumar pal",
//       "https://google.com"
//     ),
//   }).then(() => {
//     res.send("mail send successfully");
//   });
