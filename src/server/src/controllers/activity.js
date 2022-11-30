const db = require("../db");
const { findMode } = require('../utils/activityStatus')

exports.create = async (req, res, next) => {
  const { id } = req.user
  const { name, groupId, distance, typeSelected } = req.body

  if (!name || !groupId || !distance || !typeSelected) {
    return res
      .status(422)
      .json({ error: "Name, Group, Distance & Type must be provided" });
  }

  try {
    const activity = await db.activity.create({
      data: {
        name,
        groupId,
        distance: parseInt(distance),
        type: typeSelected,
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

exports.getActivitys = async (req, res) => {
  const { id } = req.user
  const statusA = req.params.status
  const statusB = statusA.toUpperCase()

  try {
    const allActivitys = await db.activity.findMany({
      where: {
        status: statusB,
        group: {
          is: {
            users: {
              some: {
                userId: id
              }
            }
          }
        },
      },
      select: {
        id: true,
        name: true,
        status: true,
        createdByUser: true,
        user: {
          select: {
            id: true,
            username: true
          }
        },
        group: {
          select: {
            id: true,
            name: true,
          },
        }
      }
    })

    if (allActivitys.length === 0) {
      res.status(404).json({error: "You have no activities being voted on."})
    } else {
      res.json({allActivitys})
    }
  } catch (error) {
    return res.status(500).json({error})
  }
}

exports.getOne = async (req, res, next) => {
  const { id } = req.params
  const userid = req.user.id

  try {
    const data = await db.activity.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        status: true,
        createdByUser: true,
        group: {
          select: {
            users: {
              select: {
                user: {
                  select: {
                    id: true,
                    username: true,
                  }
                }
              }
            }
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

exports.updateStatusCompleted = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const updatedActivity = await db.activity.updateMany({
      where: {
        id,
        createdByUser: userId
      },
      data: {
        status: "COMPLETED",
      }
    })

    if(!updatedActivity) {
      res.status(404).json({error: "Activity not found"})
    }
    res.json({updatedActivity})
  } catch (error) {
    res.status(500).json({error})
  }
}