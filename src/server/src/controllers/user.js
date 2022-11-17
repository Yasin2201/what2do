const db = require("../db");

exports.me = async (req, res, next) => {
  const { id } = req.user;

  const user = await db.user.findFirst({
    where: {
      id
    }
  })

  res.json({user})
}