const db = require("../db");

exports.create = async (req, res, next) => {
  const { name } = req.body

  if (!name) {
    return res
      .status(422)
      .json({ error: "Name must be provided" });
  }

  const group = await db.group.create({
    data: {
      name,
    },
  });

  return res.json({group});
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

exports.getAll = async (req, res, next) => {

};

exports.getOne = async (req, res, next) => {

};
