const db = require("../db");

exports.create = async (req, res, next) => {
  const { id } = req.params
  const { placeid } = req.body
  const userid = req.user.id

  if (!placeid || !userid) {
    return res
      .status(422)
      .json({ error: "placeid and userid must be provided" });
  }

  try {
    const activityGroupIds = await db.activity.findFirst({
      where: {
        id,
      },
      select: {
          group: {
            select: {
              users: {
                select: {
                  user: {
                    select: {
                      id: true
                    }
                  }
                }
              }
            }
          }
        }
    })

    const validUser = activityGroupIds.group.users.some((groupUsers) => {
      return groupUsers.user.id === userid
    })

    if (!validUser) {
      return res.status(401).json({ error: "Unauthorized to vote for this activity" });
    }

    const existingVote = await db.vote.findFirst({
      where: {
        activityId: id,
        userId: userid
      }
    })

    if (existingVote) {
      return res.status(422).json({ error: "You have already voted" });
    }

    const vote = await db.vote.create({
      data: {
        placeid,
        userId: userid,
        activityId: id
      },
    });
  
    return res.json({vote});
  } catch (error) {
    res.status(500).json({error})
  }
}