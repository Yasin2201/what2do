const db = require("../db");

exports.create = async (req, res, next) => {
  const { name } = req.body
  const { id } = req.user

  if (!name || !id) {
    return res
      .status(422)
      .json({ error: "Group Name must be provided" });
  }

  try {
    const group = await db.group.create({
      data: {
        name,
        users: {
          create: [
            {
              admin: true,
              user: {
                connect: {
                  id
                }
              }
            }
          ]
        }
      },
    });
  
    return res.json({group});
  } catch (error) {
    res.status(404).json({error})
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    const deletedGroup = await db.group.delete({
      where: {
        id
      },
    })
    return res.json({deletedGroup});
  } catch (error) {
    res.status(404).json({error})
  }
};

//edit group name improve funvtionality later
exports.update = async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body

  if (!name) {
    return res
      .status(422)
      .json({ error: "Name must be provided" });
  }

  try {
    const updatedGroup = await db.group.update({
      where: {
        id
      },
      data: {
        name
      },
    })
    return res.json({updatedGroup});
  } catch (error) {
    res.status(404).json({error})
  }
};

exports.joinGroup = async (req, res, next) => {
  const { id } = req.user
  const { groupId } = req.body

  if (!groupId) {
    return res
      .status(422)
      .json({ error: "Join Code must be provided" });
  }

  const existingUserGroup = await db.userGroup.findFirst({
    where: {
      userId: id,
      groupId
    },
  });

  if (existingUserGroup) {
    return res.status(422).json({ error: "User is already in this group..." });
  }

  try {
    const userGroup = await db.userGroup.create({
      data: {
        user: {
          connect: {
            id
          }
        },
        group: {
          connect: {
            id: groupId
          }
        }
      }
    })
  
    return res.json({userGroup});
  } catch (error) {
    res.status(404).json({error})
  }
};

exports.getAll = async (req, res, next) => {
  const { id } = req.user

  try {
    const allGroups = await db.userGroup.findMany({
      where: {
        user: {
          id
        }
      },
      include: {
        group: true
      }
    });

    if (allGroups.length === 0) {
      res.json({message: "You have no groups"})
    } else {
      res.json({allGroups})
    }
  
  } catch (error) {
    res.status(404).json({error})
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params
  const userid = req.user.id

  try {
    const group = await db.userGroup.findFirst({
      where: {
        groupId: id,
        userId: userid
      },

    });

    if (!group) {
      res.status(403).json({message: "You don't have access to this group!"})
    } else {
      res.json({group})
    }
  
  } catch (error) {
    res.status(404).json({error})
  }
};
