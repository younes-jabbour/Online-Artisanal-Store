const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

const bcrypt = require("bcrypt");

const post = [
  {
    id: 1,
    title: "Post 1",
    body: "This is post one",
  },
  {
    id: 2,
    title: "Post 2",
    body: "This is post two",
  },
];

const getPost = async (req, res) => {
  return res.status(200).json(post);
};

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

const GetUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const type = req.params.type;
  if (type === "visitor") {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    // get normal password from the hashed password user.hashpassword

    res.status(200).json(user);
  } else if (type === "artisan") {
    const artisan = await prisma.artisan.findUnique({
      where: { id: id },
    });
    if (!artisan) return res.status(404).json({ error: "Artisan not found" });
    res.status(200).json(artisan);
  }
};

// update user

const UpdateUser = async (req, res) => {
  console.log(req.body);
  // const id = parseInt(req.params.id);
  // const type = req.params.type;
  // const { name, email, password } = req.body;
  // if (type === "visitor") {
  //   const user = await prisma.user.findUnique({
  //     where: { id: id },
  //   });
  //   if (!user) return res.status(404).json({ error: "User not found" });
  //   const salt = await bcrypt.genSalt(10);
  //   const hashpassword = await bcrypt.hash(password, salt);
  //   try {
  //     const updatedUser = await prisma.user.update({
  //       where: { id: id },
  //       data: {
  //         name: name,
  //         email: email,
  //         password: hashpassword,
  //       },
  //     });
  //     res.status(200).json(updatedUser);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // } else if (type === "artisan") {
  //   const artisan = await prisma.artisan.findUnique({
  //     where: { id: id },
  //   });
  //   if (!artisan) return res.status(404).json({ error: "Artisan not found" });
  //   const salt = await bcrypt.genSalt(10);
  //   const hashpassword = await bcrypt.hash(password, salt);
  //   try {
  //     const updatedArtisan = await prisma.artisan.update({
  //       where: { id: id },
  //       data: {
  //         name: name,
  //         email: email,
  //         password: hashpassword,
  //       },
  //     });
  //     res.status(200).json(updatedArtisan);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // }
};

module.exports = { CreateUser, CreateArtisan, GetUserById, UpdateUser };
