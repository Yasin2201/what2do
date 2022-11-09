const db = require("../db");
const { findMode } = require('../utils/activityStatus')

exports.create = async (req, res, next) => {
  const { groupid } = req.body

  try {
    const activity = await db.activity.create({
      data: {
        groupId: groupid
      }
    });
    return res.json({activity});

  } catch (error) {
    return res.status(500).json({error});
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    const deletedActivity = await db.activity.delete({
      where: {
        id
      },
    })
    return res.json({deletedActivity});
  } catch (error) {
    res.status(404).json({error})
  }
};

// this may not be applicable leave for now
exports.update = async (req, res, next) => {
  const { id } = req.params

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

    if (currActivity.status === "VOTING" && currActivity.votes.length === currActivity.group.users.length) {
      let mostVotedPlace;
      const votePlaceIds = currActivity.votes.map((vote) => vote.placeid)
      mostVotedPlace = findMode(votePlaceIds);

      if (mostVotedPlace.length > 1) {
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
    }
    return res.json({currActivity});
  } catch (error) {
    res.status(404).json({error})
  }
};

exports.getAll = async (req, res, next) => {
  const { id } = req.body //temporary id will be from payload on completion

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
      res.status(200).json({message: "You have no activities planned."})
    } else {
      res.json({allActivities})
    }
  
  } catch (error) {
    res.status(404).json({error})
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params
  const { userid } = req.body //temporary id will be from payload on completion

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
    res.status(404).json({error})
  }
};
