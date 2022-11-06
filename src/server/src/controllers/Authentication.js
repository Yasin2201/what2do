const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  //const password = req.body.password;

  if (!username) { // (!username || !password)
    return res
      .status(422)
      .json({ error: "Username must be provided" }); //"Username and password must be provided"
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    return res.status(422).json({ error: "Username is aleready in use..." });
  }

  const user = await prisma.user.create({
    data: {
      username,
    },
  });

  return res.json({user});
};
