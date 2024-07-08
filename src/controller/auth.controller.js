const { ComparePassword, HashPassword } = require("../helper/hash_pass_helper");
const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const transporter = require("../lib/nodemailer");
var jwt = require("jsonwebtoken");

async function register(req, res) {
  const { name, email, password, is_admin } =
    req.body;

  const hashPass = await HashPassword(password);

  const emailUser = await prisma.users.findUnique({
    where: { email: email },
  });

  if (emailUser) {
    let resp = ResponseTemplate(null, "Email already exist", null, 404);
    res.status(404).json(resp);
    return;
  }

  try {
    await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashPass,
        is_admin: is_admin,
      }
    });

    const token = jwt.sign(
      {
        email: email,
      },
      process.env.SECRET_KEY
    );

    await transporter.sendMail({
      from: process.env.EMAIL_SMTP,
      to: email,
      subject: "Verification your email",
      text: `Click here to verify your email`,
      html: `<a href="${process.env.BASE_URL}/api/v1/auth/verify-email?token=${token}">Click here to verify your email</a>`,
    });

    const userView = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        is_admin: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(userView, "success", null, 201);
    res.status(201).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const checkUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (checkUser === null) {
      let resp = ResponseTemplate(
        null,
        "email is not found or incorrect",
        null,
        400
      );
      res.status(400).json(resp);
      return;
    }

    if (!checkUser.is_verified) {
      let resp = ResponseTemplate(null, "email is not verified", null, 400);
      res.status(400).json(resp);
      return;
    }

    const checkPassword = await ComparePassword(password, checkUser.password);

    if (!checkPassword) {
      let resp = ResponseTemplate(null, "password is not correct", null, 400);
      res.status(400).json(resp);
      return;
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        is_admin: checkUser.is_admin,
      },
      process.env.SECRET_KEY
    );

    const data = {
      token: token,
    };

    let resp = ResponseTemplate(data, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const User = await jwt.verify(token, process.env.SECRET_KEY);

    await prisma.users.update({
      where: {
        email: User.email,
      },
      data: {
        is_verified: true,
      },
    });

    let resp = ResponseTemplate(
      null,
      "success, your email has been verified",
      null,
      200
    );
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function forgetPassword(req, res) {
  const { email } = req.body;

  try {
    const checkUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (checkUser === null) {
      let resp = ResponseTemplate(null, "email not found", null, 400);
      res.status(400).json(resp);
      return;
    }

    const token = jwt.sign(
      {
        email: checkUser.email,
      },
      process.env.SECRET_KEY_RP,
      { expiresIn: "1h" }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_SMTP,
      to: email,
      subject: "Reset your password",
      html: `Token : ${token}`,
    });

    let resp = ResponseTemplate(null, "success, please check your email", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function resetPassword(req, res) {
  const { newPassword } = req.body;
  
  const { token } = req.query;

  const HashNewPass = await HashPassword(newPassword);

  try {
    const User = await jwt.verify(token, process.env.SECRET_KEY_RP);

    await prisma.users.update({
      where: { email: User.email },
      data: {
        password: HashNewPass,
      },
    });

    let resp = ResponseTemplate(null, "Password reset successfully", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  register,
  login,
  verifyEmail,
  forgetPassword,
  resetPassword,
};
