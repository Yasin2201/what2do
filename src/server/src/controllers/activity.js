const db = require("../db");

exports.create = async (req, res, next) => {
  try {
    const activity = await db.activity.create();
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
  const { placeid } = req.body

  if (!placeid) {
    return res
      .status(422)
      .json({ error: "Place must be selected"  });
  }

  try {
    const updatedActivity = await db.activity.update({
      where: {
        id
      },
      data: {
        placeid
      },
    })
    return res.json({updatedActivity});
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
