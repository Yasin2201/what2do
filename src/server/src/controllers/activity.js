const db = require("../db");
const { findMode } = require('../utils/activityStatus')

exports.create = async (req, res, next) => {
  const { id } = req.user
  const { name, groupId } = req.body

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
    res.status(500).json({error})
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
    res.status(500).json({error})
  }
};

exports.getAll = async (req, res, next) => {
  const { id } = req.user

  try {
    const allActivities = await db.$queryRaw`
      SELECT "Activity".id AS "activity_id", "Activity"."placeid", "Group"."name" AS "group_name", "User"."username" FROM "Activity"
        LEFT JOIN "Group"
          ON "Group".id = "Activity"."groupId"
        LEFT JOIN "UserGroup"
          ON "UserGroup"."groupId" = "Group".id
        LEFT JOIN "User"
          ON "User".id = "UserGroup"."userId"
          WHERE "User".id = ${id};`

    if (allActivities.length === 0) {
      res.status(404).json({message: "You have no activities planned."})
    } else {
      res.json({allActivities})
    }
  
  } catch (error) {
    res.status(500).json({error})
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params
  const userid = req.user.id

  try {
    const activity = await db.$queryRaw`
      SELECT "Activity".id FROM "Activity"
        LEFT JOIN "Group"
          ON "Group".id = "Activity"."groupId"
        LEFT JOIN "UserGroup"
          ON "UserGroup"."groupId" = "Group".id
        LEFT JOIN "User"
          ON "User".id = "UserGroup"."userId"
          WHERE "User".id = ${userid} AND "Activity"."id" = ${id};`

    if (activity.length === 0) {
      res.status(404).json({message: "Activity doesn't exist."})
    } else {
      res.json({activity})
    }
  
  } catch (error) {
    res.status(500).json({error})
  }
};
