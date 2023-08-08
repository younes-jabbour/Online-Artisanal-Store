const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  const categories = await prisma.Category.findMany();
  try {
    res.status(200).json(categories);
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = { getCategories };
