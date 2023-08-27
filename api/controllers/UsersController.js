const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

const bcrypt = require("bcrypt");

const PATH = require("path");
const fs = require("fs");

// function that create a new user

const CreateUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (user) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const { name, email, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashpassword,
        role: role,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function that log new users (visitor or artisan ) and assign to each one a unique JWT Token.

const GetUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  const UserInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    ImgUrl: user.ImgUrl,
    desc: user.desc,
    role: user.role,
  };
  if (!user) return res.status(404).json({ error: "User not found" });
  // get normal password from the hashed password user.hashpassword

  res.status(200).json(UserInfo);
};

// update user

const UpdateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, newPassword, oldPassword, desc } = req.body;
  // verify the old password
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  if (newPassword === "null" && oldPassword === "null") {
    if (req.file) {
      const { path } = req.file;
      const imagePath = path.replace(/\\/g, "/");
      const NewImagePath = imagePath.replace("public", "http://localhost:5000");

      if (user.ImgUrl) {
        const parts = user.ImgUrl.split("/");
        const filename = parts[parts.length - 1];
        const Path = PATH.join(__dirname, "../public/images/users", filename);
        fs.unlinkSync(Path); // delete image from folder
      }

      try {
        const updatedUser = await prisma.user.update({
          where: { id: id },
          data: {
            name: name,
            email: email,
            desc: user.role === "artisan" ? desc : null,
            ImgUrl: NewImagePath,
          },
        });

        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } else {
      try {
        const updatedUser = await prisma.user.update({
          where: { id: id },
          data: {
            name: name,
            email: email,
            desc: user.role === "artisan" ? desc : null,
          },
        });

        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Wrong old password" });
  // hash the new password

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(newPassword, salt);

  if (req.file) {
    const { path } = req.file;
    const imagePath = path.replace(/\\/g, "/");
    const NewImagePath = imagePath.replace("public", "http://localhost:5000");

    if (user.ImgUrl) {
      const parts = user.ImgUrl.split("/");
      const filename = parts[parts.length - 1];
      const Path = PATH.join(__dirname, "../public/images/users", filename);
      fs.unlinkSync(Path); // delete image from folder
    }
    try {
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          name: name,
          email: email,
          password: hashpassword,
          desc: user.role === "artisan" ? desc : null,
          ImgUrl: NewImagePath,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          name: name,
          email: email,
          password: hashpassword,
          desc: user.role === "artisan" ? desc : null,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = { CreateUser, GetUserById, UpdateUser };

//CreateArtisan
