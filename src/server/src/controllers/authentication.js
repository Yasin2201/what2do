const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const db = require("../db");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, secret);
}

exports.login = function (req, res) {
  return res.send({ token: tokenForUser(req.user) });
};

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(422)
      .json({ error: "Username and password must be provided" });
  }

  const existingUser = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    return res.status(422).json({ error: "Username is already in use..." });
  }

  const user = await db.user.create({
    data: {
      username,
      password
    },
  });

  return res.json({token: tokenForUser(user)});
};
