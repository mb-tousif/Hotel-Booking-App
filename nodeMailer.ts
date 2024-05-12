/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import config from "../config";

const sendResetPasswordEmail = (name: string, email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: `${config.app_name} Password Reset Confirmation`,
    html: `
        <div><h4>Dear ${name},</h4>
        <p>We hope this message finds you well. In an effort to enhance your online security, ${config.app_name} has received a request to reset the password for your account.</p>

        <p>Do you want to change your password? Please click on the following link to <a style="color: blue, font-weight: bold" href = "http://localhost:3000/auth/reset-password/?token=${token}"> Reset your password </a></p></div>

        <p>If you did not request this password reset, please contact us immediately at support@hba.com or 1234.</p>

        <p>Thank you for staying. We're committed to serve you.</p>

        <p>Regards,</p>
        <p>${config.app_name} Team</p>
        <p>1205, Dhaka, Bangladesh</p>
    `,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.info("Email sent:", info.response);
      }
    }
  );
};

export const EmailService = {
  sendResetPasswordEmail,
};
