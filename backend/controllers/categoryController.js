const Category = require("../models/Category");
const { formatDate } = require("../helper/dateHelper.js");
const { Op } = require("sequelize");

async function categoryIndex(req, res, next) {
  try {
    const category = await Category.findAll({
      order: [["name", "ASC"]]
    });

    const result = category.map(cr => {
      return {
        id: cr.id,
        name: cr.name,
        created_at: formatDate(cr.created_at),
        updated_at: formatDate(cr.updated_at)
      };
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function categoryData(req, res, next) {
  try {
    const {
      page = 1,
      perPage = 10,
      search = "",
      sortColumn = 0,
      sortOrder = "asc"
    } = req.query;

    const column = ["name", "updated_at"];
    const totalCategory = await Category.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            updated_at: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    });

    const category = await Category.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            updated_at: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      },
      order: [[column[parseInt(sortColumn)], sortOrder]],
      limit: parseInt(perPage),
      offset: (page - 1) * perPage
    });

    const result = category.map(cr => ({
      id: cr.id,
      name: cr.name,
      created_at: formatDate(cr.created_at),
      updated_at: formatDate(cr.updated_at)
    }));

    return res
      .status(200)
      .json({ success: true, data: result, total: totalCategory });
  } catch (error) {
    next(error);
  }
}

async function categoryStore(req, res, next) {
  try {
    await Category.create({ name: req.body.name }, { user: req.user });
    res.status(200).json({ success: true, message: "Data Created" });
  } catch (error) {
    next(error);
  }
}

async function categoryShow(req, res, next) {
  try {
    const id = req.params.id;
    const category = await Category.findOne({
      where: { id: id }
    });

    if (!category) {
      const error = new Error("Data not found");
      error.status = 404;
      throw error;
    }

    const data = {
      id: category.id,
      name: category.name,
      created_at: formatDate(category.created_at),
      updated_at: formatDate(category.updated_at)
    };

    res.status(200).json({ succes: true, data: data });
  } catch (error) {
    next(error);
  }
}

async function categoryUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const category = await Category.findOne({
      where: { id: id }
    });

    if (!category) {
      const error = new Error("Data not found");
      error.status = 404;
      throw error;
    }

    category.name = req.body.name;
    await category.save({ user: req.user });

    res.status(200).json({ success: true, message: "Data Updated" });
  } catch (error) {
    next(error);
  }
}

async function categoryDelete(req, res, next) {
  try {
    const id = req.params.id;
    const category = await Category.findOne({
      where: { id: id }
    });
    if (!category) {
      const error = new Error("Data not found");
      error.status = 404;
      throw error;
    }
    await category.destroy();
    res.status(200).json({ success: true, message: "Data Deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  categoryIndex,
  categoryStore,
  categoryUpdate,
  categoryShow,
  categoryDelete,
  categoryData
};
