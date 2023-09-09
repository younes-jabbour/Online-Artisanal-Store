const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
// const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();

// app.use(cookieParser());

// const decalration

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SUCCESS: 200,
};

const ERROR_MESSAGE = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_AUTHORIZED: "You are not authorized!",
  REFRESH_EXPIRED: "Refresh token has expired",
};

GenerateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    type: user.type,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {
    expiresIn: "1d",
  }); // Refresh token
};
GenerateAccessToken = (user) => {
  const payload = {
    id: user.id,
    type: user.type,
  };
  return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "15s",
  }); // access token
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return res.status(404).json({ error: "Email not found" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "invalid credentials" });
  visitorData = {
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.role,
  };

  // generate both token and send it to client side.
  const AccessToken = GenerateAccessToken(visitorData);
  const RefreshToken = GenerateRefreshToken(visitorData);
  res.cookie("JWT_RefreshToken", RefreshToken, {
    httpOnly: true,
    // make maxage for 1 day
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({ AccessToken: AccessToken });
};


const refresh_token = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.JWT_RefreshToken);
  if (!cookies.JWT_RefreshToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: ERROR_MESSAGE.UNAUTHORIZED,
    });
  }
  const refresh_token = cookies.JWT_RefreshToken;

  jwt.verify(refresh_token, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);

    if (user.exp < Date.now() / 1000) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: ERROR_MESSAGE.REFRESH_EXPIRED });
    }

    const newAccessToken = GenerateAccessToken(user);
    res.status(HTTP_STATUS.SUCCESS).json({
      AccessToken: newAccessToken,
    });
  });
};

// const refresh_token = (req, res) => {
//   const refresh_token = req.body.RefreshToken;
//   if (!refresh_token)
//     return res.status(401).json({ error: "you are not authorized !" });
//   // if (!RefreshTokens.includes(refresh_token))
//   //   return res.status(403).json("Refresh token invalid !");
//   jwt.verify(refresh_token, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
//     if (err) console.log(err);

//     const newAccessToken = GenerateAccessToken(user);
//     const newRefreshToken = GenerateRefreshToken(user);

//     res.status(201).json({
//       AccessToken: newAccessToken,
//       RefreshToken: newRefreshToken,
//     });
//   });
// };

const Logout = (req, res) => {
  res.clearCookie("JWT_RefreshToken");

  res.status(200).json("you logged out successfuly");
};

module.exports = { Login, Logout, refresh_token };
