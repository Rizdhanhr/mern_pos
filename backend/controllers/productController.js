const Product = require("../models/Product");
const { formatDate } = require("../helper/dateHelper.js");
const { Op } = require("sequelize");

async function productIndex(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productData(req, res, next) {
  try {
    res.status(200).json({ success: true, message: "Berhasil" });
  } catch (error) {
    next(error);
  }
}

async function productStore(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productShow(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productUpdate(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

async function productDelete(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

module.exports = {
  productIndex,
  productStore,
  productUpdate,
  productShow,
  productDelete,
  productData
};
