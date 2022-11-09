const db = require("../db");

exports.create = async (req, res, next) => {
  const { id } = req.params
  const { placeid, userid } = req.body

  if (!placeid || !userid) {
    return res
      .status(422)
      .json({ error: "placeid and userid must be provided" });
  }

  try {
    const vote = await db.vote.create({
      data: {
        placeid,
        userId: userid,
        activityId: id
      },
    });
  
    return res.json({vote});
  } catch (error) {
    res.status(404).json({error})
  }
}