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
    return res.status(500).json({error})
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const isUserGroupAdmin = await db.userGroup.findFirst({
      where: {
        userId,
        groupId: id,
      }
    })

    if (!isUserGroupAdmin) {
      return res
          .status(404)
          .json({ error: "Group not found" });
    }

    if (!isUserGroupAdmin.admin) {
      return res
          .status(401)
          .json({ error: "Only admins can delete this group" });
    }

    const deletedGroup = await db.group.delete({
      where: {
        id
      },
    })
    return res.json({deletedGroup});
  } catch (error) {
    return res.status(500).json({error})
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
    return res.status(500).json({error})
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

  const existingGroup = await db.group.findFirst({ where: { id: groupId }})

  if (!existingGroup) {
    return res.status(404).json({ error: "Group does not exist" });
  }

  const existingUserGroup = await db.userGroup.findFirst({
    where: {
      userId: id,
      groupId
    },
  });

  if (existingUserGroup) {
    return res.status(422).json({ error: "You are already in this group" });
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
    return res.status(500).json({error})
  }
};

exports.leaveGroup = async (req, res, next) => {
  const { id } = req.user
  const { groupId } = req.params

  try {
    const existingUserGroup = await db.userGroup.findFirst({
       where: { 
        userId: id,
        groupId
      }
      })

    if (!existingUserGroup) {
      return res.status(404).json({ error: "Group does not exist" });
    }

    const userGroup = await db.userGroup.deleteMany({
      where: {
        userId: id,
        groupId
      }
    })

    return res.json({userGroup});
  } catch (error) {
    return res.status(500).json({error})
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
      return res.status(404).json({error: "You have no groups"})
    } else {
      return res.json({allGroups})
    }
  
  } catch (error) {
    return res.status(500).json({error})
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params
  const userid = req.user.id

  try {
    const group = await db.Group.findFirst({
      where: {
        id,
      },
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    });

    if (!group) {
      return res.status(404).json({error: "Group not found"})
    }

    const admin = group.users.some(el => el.userId === userid && el.admin)

    const groupData = {
      ...group,
      isAdmin: admin
    }

    return res.json({groupData})
  } catch (error) {
    return res.status(500).json({error})
  }
};
