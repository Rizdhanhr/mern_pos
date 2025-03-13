const Brand = require("../models/Brand");
const { formatDate } = require("../helper/dateHelper.js");
const logger = require("../config/logger");
const { Op } = require("sequelize");

async function brandIndex(req, res, next) {
  try {
    const brand = await Brand.findAll();
    const result = brand.map(br => {
      return {
        id: br.id,
        name: br.name,
        created_at: formatDate(br.created_at),
        updated_at: formatDate(br.updated_at)
      };
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function brandData(req, res, next) {
  try {
    const {
      page = 1,
      perPage = 10,
      search = "",
      sortColumn = 0,
      sortOrder = "asc"
    } = req.query;

    const column = ["name", "updated_at"];
    const totalBrands = await Brand.count({
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

    const brands = await Brand.findAll({
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

    const result = brands.map(br => ({
      id: br.id,
      name: br.name,
      created_at: formatDate(br.created_at),
      updated_at: formatDate(br.updated_at)
    }));

    return res
      .status(200)
      .json({ success: true, data: result, total: totalBrands });
  } catch (error) {
    next(error);
  }
}

async function brandStore(req, res, next) {
  try {
    await Brand.create({ name: req.body.name }, { user: req.user });
    return res.status(200).json({ success: true, message: "Data Created" });
  } catch (error) {
    next(error);
  }
}

async function brandShow(req, res, next) {
  try {
    const { id } = req.params;
    const brand = await Brand.findOrFail(
      {
        where: { id: id }
      },
      res
    );
    const data = {
      id: brand.id,
      name: brand.name,
      created_at: formatDate(brand.created_at),
      updated_at: formatDate(brand.updated_at)
    };

    return res.status(200).json({ succes: true, data: data });
  } catch (error) {
    next(error);
  }
}

async function brandUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const brand = await Brand.findOrFail(
      {
        where: { id: id }
      },
      res
    );

    brand.name = req.body.name;
    await brand.save({ user: req.user });
    return res.status(200).json({ succes: true, message: "Data Updated" });
  } catch (error) {
    next(error);
  }
}

async function brandDelete(req, res, next) {
  try {
    const id = req.params.id;
    const brand = await Brand.findOrFail(
      {
        where: { id: id }
      },
      res
    );

    await brand.destroy();

    return res.status(200).json({ success: true, message: "Data Deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  brandIndex,
  brandStore,
  brandUpdate,
  brandShow,
  brandDelete,
  brandData
};
