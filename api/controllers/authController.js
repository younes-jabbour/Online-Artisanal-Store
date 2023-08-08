const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");


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
  return jwt.sign(payload,process.env.REFRESH_SECRET_TOKEN,{
    expiresIn: "1d",
  }); // Refresh token
};
GenerateAccessToken = (user) => {
  const payload = {
    id: user.id,
    type: user.type,
  };
  return jwt.sign(payload,process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "15m",
  }); // access token
};

// login api .
const Login = async (req, res) => {
  const { email, password, type } = req.body;
  if (type === "visitor") {
    const visitor = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!visitor) return res.status(404).json({ error: "Email not found" });
    const validPassword = await bcrypt.compare(password, visitor.password);
    if (!validPassword)
      return res.status(400).json({ error: "invalid credentials" });
    visitorData = {
      id: visitor.id,
      name: visitor.name,
      email: visitor.email,
      type: type,
    };

    // generate both token and send it to client side.
    const AccessToken = GenerateAccessToken(visitorData);
    const RefreshToken = GenerateRefreshToken(visitorData);
    res.cookie("JWT_RefreshToken", RefreshToken, {
      httpOnly: true,
    });
    res.status(201).json({ AccessToken: AccessToken });

  } else if (type === "artisan") {
    const artisan = await prisma.artisan.findUnique({
      where: {
        email: email,
      },
    });
    if (!artisan) return res.status(404).json({ error: "Email not found" });
    const validPassword = await bcrypt.compare(password, artisan.password);
    if (!validPassword) {
      return res.status(400).json({ error: "invalid credentials" });
    }
    artisanData = {
      id: artisan.id,
      name: artisan.name,
      email: artisan.email,
      type: type,
    };

    // generate both token and send it to client side.
    const AccessToken = GenerateAccessToken(artisanData);
    const RefreshToken = GenerateRefreshToken(artisanData);
    res.cookie("JWT_RefreshToken", RefreshToken, {
      httpOnly: true,
    });
    res.status(201).json({AccessToken: AccessToken});
  }
};

// Refresh token api.

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
    if (err) return res.sendStatus(HTTP_STATUS.FORBIDDEN);

    if (user.exp < Date.now() / 1000) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
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

//     // RefreshTokens = RefreshTokens.filter((token) => token !== refresh_token);

//     const newAccessToken = GenerateAccessToken(user);
//     const newRefreshToken = GenerateRefreshToken(user);

//     res.status(201).json({
//       AccessToken: newAccessToken,
//       RefreshToken: newRefreshToken,
//     });
//   });
// };

const Logout = (req, res) => {
  res.status(200).json("you logged out successfuly");
};

module.exports = { Login, Logout, refresh_token };