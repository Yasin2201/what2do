const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const db = require("../db");
const passport = require("passport");
require("../services/passport");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, secret);
}

exports.login = function (req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
        res.status(401);
        res.send(info.message);
        return;
    }
    const {id, username} = user
    return res.send({ token: tokenForUser(user), user: {id, username} });
  })(req, res, next);
};

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "Username and password must be provided" });
  }

  const existingUser = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    return res.status(422).send({ error: "Username is already in use" });
  }

  const user = await db.user.create({
    data: {
      username,
      password
    },
  });

  return res.send({ token: tokenForUser(user), user});
};
