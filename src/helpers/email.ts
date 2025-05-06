import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_APP_EMAIL!,
        pass: process.env.NODEMAILER_APP_PASSWORD!,
      },
    });

    const mailOptions = {
      from: `"Secure Rent" <${process.env.NODEMAILER_APP_EMAIL!}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};
