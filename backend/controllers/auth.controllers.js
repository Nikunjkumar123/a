const UserModel = require("../Model/UserModel.js");
const EmailVerifyModelSigUP = require("../Model/EmailModel.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sentResetPasswordMail = async (name, email, myToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use 587 for TLS
      secure: false, // Use false for TLS
      requireTLS: true, // Ensure TLS is used
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "For reset password",
      html:
        "<p>Hi " +
        name +
        ", please check 4 digit OTP " +
        myToken +
        " for reset your password</a></p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};
const sentResetPasswordMail2 = async (email, myToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use 587 for TLS
      secure: false, // Use false for TLS
      requireTLS: true, // Ensure TLS is used
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "For reset password",
      html:
        "<p>Hi " +
        ", please check 6 digit OTP " +
        myToken +
        " for Verify Email</a></p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

const RegisterUser = async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    if (!Name || !email || !password) {
      return res.status(400).json({ message: "Enter complete fields" });
    }
    const checkuser = await UserModel.findOne({ email: email });
    if (checkuser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await UserModel.create({
      Name,
      email,
      password,
    });

    res.status(201).json({ message: "user created", user: user });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({
      msg: " register failed",
      error: error.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Enter complete fields" });
    }
    const checkuser = await UserModel.findOne({ email });
    if (!checkuser) {
      return res.status(400).json({ message: "Enter correct email" });
    }

    const check = await checkuser.comparePassword(password);
    if (!check) {
      return res.status(400).json({ message: "Enter correct password" });
    }

    const token = checkuser.createToken();
    if (!token) {
      return res.status(500).json({ message: "Token problem" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2592000000, // 30 days in milliseconds
      sameSite: "None",
    });

    return res.status(200).json({ user: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error); // Log error for debugging
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

const LoginAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Enter complete fields" });
    }
    const checkuser = await UserModel.findOne({ email });
    if (!checkuser) {
      return res.status(400).json({ message: "Enter correct email" });
    }

    if (checkuser.role !== "admin") {
      return res.status(400).json({ message: "You are not admin" });
    }

    const check = await checkuser.comparePassword(password);
    if (!check) {
      return res.status(400).json({ message: "Enter correct password" });
    }

    const token = checkuser.createToken();
    if (!token) {
      return res.status(500).json({ message: "Token problem" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2592000000, // 30 days in milliseconds
      sameSite: "None",
    });

    return res.status(200).json({ user: "Login successfully" });
  } catch (error) {
    console.error("Error during login:", error); // Log error for debugging
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

const LogoutUser = async (req, res) => {
  try {
    const { email } = req.user;
    const { userEmail } = req.body;
    if (userEmail != email)
      return res.status(400).json({ msg: "authorized request failed" });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error", error.message);

    res.status(500).json({ error: error, message: "Logout failed" });
  }
};

const generateOTP = () => {
  return crypto.randomInt(1000, 9999).toString(); // Generates a 4-digit OTP
};

const forgotPasswordUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userData = await UserModel.findOne({ email: userEmail });
    if (!userData) return res.status(400).json({ msg: "email not registered" });
    const otp = generateOTP();
    const data = await UserModel.updateOne(
      { email: userEmail },
      { $set: { myToken: otp } }
    );
    sentResetPasswordMail(userData?.Name, userData.email, otp);
    res.status(200).json({ msg: "please check your Email" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const verifyEmailUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const otp = generateOTP();

    // Upsert: If email exists, update OTP; otherwise, create a new entry
    await EmailVerifyModelSigUP.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true } // Create if not exists, return updated document
    );

    await sentResetPasswordMail2(email, otp);

    res
      .status(200)
      .json({ msg: `${email}, please check your email for the OTP` });
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const verifyTokenOTP = async (req, res) => {
  try {
    const { email, myToken } = req.body;
    console.log("email", email, "myToken", myToken);

    const user = await UserModel.findOne({ email: email });
    if (user.myToken != myToken) {
      return res.status(400).json({ msg: "enter correct otp" });
    }
    user.myToken = process.env.DEMO_TOKEN;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);
    const user = await EmailVerifyModelSigUP.findOne({ email: email });
    if (user.otp != otp) {
      return res.status(400).json({ msg: "enter correct otp" });
    }
    user.myToken = "verified";
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePasswordOTP = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user.myToken != 2911200429112004) {
      return res
        .status(400)
        .json({ msg: "please verify yourself or try again" });
    }
    user.password = password;
    user.myToken = "";
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CheckUser = (req, res) => {
  const token = req.cookies.token;
  // if (!token) {
  //   return res.status(403).json({ loggedIn: false });
  // }
  // console.log("token",token);
  
  const data = jwt.verify(token, process.env.SECRCET);
  if (!data) {
    return res.status(403).json({ message: "No token found" });
  }
  if (token) {
    let userId = data;
    res.json({ loggedIn: true, userId });
  } else {
    return res.status(200).json({ loggedIn: false });
  }
};


// const CheckUser = (req, res) => {
//   const token = req.cookies.token;
//   console.log("token",token);
// if(token){
//   const data = jwt.verify(token, process.env.SECRCET);
//   if (!data) {
//     return res.status(403).json({ message: "No token found" });
//   }
//   let userId = data;
//   res.json({ loggedIn: true, userId });
// }
//    else {
//     return res.status(200).json({ loggedIn: false });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  LogoutUser,
  forgotPasswordUser,
  verifyTokenOTP,
  updatePasswordOTP,
  verifyEmailUser,
  verifyEmailOTP,
  CheckUser,
  getAllUsers,
  LoginAdminUser,
};
