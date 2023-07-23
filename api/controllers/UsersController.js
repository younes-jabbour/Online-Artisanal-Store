const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const bcrypt = require("bcrypt");

// const posts = [ // for testing purpose
//   {
//     name: "younes",
//     title: "Dragon ball",
//   },
//   {
//     name: "appah",
//     title: "Gumball",
//   },
// ];

// const getPost =
//   (authenticateToken,
//   async (req, res) => {
//     res.json(posts);
//   });

// function that create a new user

const CreateUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (user) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const { name, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashpassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// function that create a new artisan

const CreateArtisan = async (req, res) => {
  const artisan = await prisma.artisan.findUnique({
    where: { email: req.body.email },
  });
  if (artisan) return res.status(409).json({ error: "Email already exists" });

  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    const artisan = await prisma.artisan.create({
      data: {
        name,
        email,
        password: hashpassword,
      },
    });
    res.status(201).json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// function that log new users (visitor or artisan ) and assign to each one a unique JWT Token.

const Login = async (req, res) => {
  const { email, password, type } = req.body;
  if (type === "visitor") {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(email);
    if (!user) return res.status(404).json({ error: "Email not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "invalid credentials" });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: Token(user.id),
    });
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
    res.status(201).json({
      id: artisan.id,
      name: artisan.name,
      email: artisan.email,
      token: Token(artisan.id),
    });
  }
};

Token = (id) => {
  return jwt.sign(id, process.env.ACCESS_SECRET_TOKEN); // access token
};


module.exports = { CreateUser, CreateArtisan, Login, getPost };
