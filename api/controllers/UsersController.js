const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


require("dotenv").config();

const bcrypt = require("bcrypt");


// const getPost = async (req,res) => { 
//   result = req.auth.id ;
//   res = result ;
//   return res ;
// }

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




module.exports = { CreateUser, CreateArtisan };
