const db = require("../db");
const { findMode } = require('../utils/activityStatus')

exports.create = async (req, res, next) => {
  const { id } = req.user
  const { name, groupId } = req.body

  if (!name || !groupId) {
    return res
      .status(422)
      .json({ error: "Name and Group must be provided" });
  }

  try {
    const activity = await db.activity.create({
      data: {
        name,
        groupId,
        createdByUser: id
      }
    });
    return res.json({activity});

  } catch (error) {
    return res.status(500).json({error});
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const foundActivity = await db.activity.findFirst({where: { id }});

    if (!foundActivity) {
     return res.status(404).json({error: "Activity not found"})
    }

    if (foundActivity.createdByUser !== userId) {
     return res.status(401).json({error: "You can only delete Activities you created"})
    }

    const deletedActivity = await db.activity.deleteMany({
      where: {
        id,
        createdByUser: userId
      }
    })

    return res.json({deletedActivity: {...deletedActivity, foundActivity}});
  } catch (error) {
    return res.status(500).json({error})
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params
  const { completed } = req.body
  const userId = req.user.id

  try {
    const currActivity = await db.activity.findFirst({
      where: {
        id
      },
      include: {
        votes: true,
        group: {
          include: {
            users: true
          }
        }
      }
    })

    const activityUserIds = currActivity.group.users.map((user) => user.userId)

    if (activityUserIds.includes(userId)) {
      return res.status(401).json({error: "You can only update Activities you're part of"})
    }

    if (currActivity.status === "VOTING" && currActivity.votes.length === currActivity.group.users.length) {
      let mostVotedPlace;
      const votePlaceIds = currActivity.votes.map((vote) => vote.placeid)
      mostVotedPlace = findMode(votePlaceIds);

      if (mostVotedPlace.length > 1) {
        //randomly choose a place if many places have same amount of votes
        mostVotedPlace = [mostVotedPlace[Math.floor(Math.random() * mostVotedPlace.length)]]
      }

      const updateActivity = await db.activity.update({
        where: {
          id
        },
        data: {
          status: "ACTIVE",
          placeid: mostVotedPlace[0]
        }
      })
      return res.status(200).json({updateActivity});
    } else if (currActivity.status === "ACTIVE" && completed) {
      const updateActivity = await db.activity.update({
        where: {
          id
        },
        data: {
          status: "COMPLETED"
        }
      })
      return res.status(200).json({updateActivity});
    }

    return res.json({currActivity});
  } catch (error) {
    return res.status(500).json({error})
  }
};

exports.getAll = async (req, res, next) => {
  const { id } = req.user

  try {
    const allActivities = await db.$queryRaw`
      SELECT "Activity".id AS "activity_id","Activity"."createdByUser", "Activity"."name" AS "activity_name", "Activity"."status", "Group".id AS "group_id", "Group"."name" AS "group_name", "User"."username" AS "createdUser" FROM "Activity"
        LEFT JOIN "Group"
          ON "Group".id = "Activity"."groupId"
        LEFT JOIN "UserGroup"
          ON "UserGroup"."groupId" = "Group".id
        LEFT JOIN "User"
          ON "User".id = "Activity"."createdByUser"
          WHERE "UserGroup"."userId" = ${id};`

    if (allActivities.length === 0) {
      res.status(404).json({error: "You have no activities planned."})
    } else {
      res.json({allActivities})
    }
  
  } catch (error) {
    return res.status(500).json({error})
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params
  const userid = req.user.id

  try {
    const data = await db.activity.findFirst({
      where: {
        id
      },
      include: {
        group: {
          include: {
            users: true
          }
        }
      }
    })

    const isAdmin = data.createdByUser === userid

    const activity = {
      ...data, 
      isAdmin
    }

    if (!activity) {
      res.status(404).json({error: "Activity doesn't exist."})
    }

    res.json({activity})
  } catch (error) {
    return res.status(500).json({error})
  }
};
