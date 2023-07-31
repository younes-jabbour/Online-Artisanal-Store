const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

// arrays to store RefreshTokens for both users ( artisan & visitor).
let RefreshTokens = [];

GenerateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN); // Refresh token
};
GenerateAccessToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
  };
  return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN,{expiresIn:'20s'}); // access token
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
    console.log(visitorData);

    Tokens = {
      AccessToken: GenerateAccessToken(visitorData),
      RefreshToken: GenerateRefreshToken(visitorData),
    };
    RefreshTokens.push(Tokens.RefreshToken);

    // generate both token and send it to client side.
    res.status(201).json(Tokens);
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
    Tokens = {
      AccessToken: GenerateAccessToken(artisanData),
      RefreshToken: GenerateRefreshToken(artisanData),
    };
    RefreshTokens.push(Tokens.RefreshToken);
    res.status(201).json(Tokens);
  }
};

// Refresh token api.

const refresh_token = (req, res) => {
  const refresh_token = req.body.RefreshToken;
  if (!refresh_token)
    return res.status(401).json({ error: "you are not authorized !" });
  // if (!RefreshTokens.includes(refresh_token))
  //   return res.status(403).json("Refresh token invalid !");
  jwt.verify(refresh_token, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) console.log(err);

    // RefreshTokens = RefreshTokens.filter((token) => token !== refresh_token);

    const newAccessToken = GenerateAccessToken(user);
    const newRefreshToken = GenerateRefreshToken(user);

    res.status(201).json({
      AccessToken: newAccessToken,
      RefreshToken: newRefreshToken,
    });
  });
};

const Logout = (req, res) => {
  // const RefreshToken = req.body.RefreshToken;

  //  RefreshTokens = RefreshTokens.filter((token) => token !== RefreshToken);

  res.status(200).json("you logged out successfuly");
};


module.exports = { Login, Logout, refresh_token };

