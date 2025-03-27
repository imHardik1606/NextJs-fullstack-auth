import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed Token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //saving token in DB according to mail type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //creating nodemailer transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        // user: "5967fcd4121538",
        // pass: "83f32d35e00085",
        //TODO add these into .env
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: "hardik@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}">here</a> to 
          ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
          or copy and paste the link below in your browser.
        </p>
        <br>
        <p>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}</p>
      `,
    };
    
    

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
