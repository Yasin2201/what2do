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

};

exports.getOne = async (req, res, next) => {

};
