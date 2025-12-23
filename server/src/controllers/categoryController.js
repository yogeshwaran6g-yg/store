const Category = require("../models/category");
const { log, rtnRes } = require("../utils/helper");

// ADD CATEGORY
const addCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    log("Category added", "info", newCategory);
    return rtnRes(res, 200, "Category Added Successfully!", newCategory);
  } catch (err) {
    log("addCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// ADD ALL CATEGORIES
const addAllCategory = async (req, res) => {
  try {
    await Category.deleteMany();
    const inserted = await Category.insertMany(req.body);
    log("All categories added", "info", inserted.length);
    return rtnRes(res, 200, "Categories Added Successfully!", inserted);
  } catch (err) {
    log("addAllCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// GET ACTIVE CATEGORIES
const getShowingCategory = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ _id: -1 });
    return rtnRes(res, 200, "Success", categories);
  } catch (err) {
    log("getShowingCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// GET ALL CATEGORIES
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ _id: -1 });
    return rtnRes(res, 200, "Success", categories);
  } catch (err) {
    log("getAllCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// DUPLICATE FUNCTION REMOVED -> use getAllCategory
const getAllCategories = getAllCategory;

// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return rtnRes(res, 404, "Category Not Found");

    return rtnRes(res, 200, "Success", category);
  } catch (err) {
    log("getCategoryById error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return rtnRes(res, 404, "Category Not Found");

    category.name = req.body.name ?? category.name;
    category.description = req.body.description ?? category.description;
    category.icon = req.body.icon ?? category.icon;
    category.isActive = req.body.isActive ?? category.isActive;

    const updated = await category.save();
    return rtnRes(res, 200, "Category Updated Successfully!", updated);
  } catch (err) {
    log("updateCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// UPDATE MANY CATEGORIES
const updateManyCategory = async (req, res) => {
  try {
    const updatedData = {};

    for (const key of Object.keys(req.body)) {
      if (
        req.body[key] !== "[]" &&
        Object.keys(req.body[key]).length > 0 &&
        req.body[key] !== req.body.ids
      ) {
        updatedData[key] = req.body[key];
      }
    }

    await Category.updateMany(
      { _id: { $in: req.body.ids } },
      { $set: updatedData }
    );

    return rtnRes(res, 200, "Categories Updated Successfully!");
  } catch (err) {
    log("updateManyCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// UPDATE STATUS
const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.isActive;

    const result = await Category.updateOne(
      { _id: req.params.id },
      { $set: { isActive: newStatus } }
    );

    if (!result.modifiedCount)
      return rtnRes(res, 404, "Category Not Found or Already Same State");

    return rtnRes(
      res,
      200,
      `Category ${newStatus ? "Published" : "Un-Published"} Successfully!`
    );
  } catch (err) {
    log("updateStatus error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// DELETE ONE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const result = await Category.deleteOne({ _id: req.params.id });

    if (!result.deletedCount) return rtnRes(res, 404, "Category Not Found");

    return rtnRes(res, 200, "Category Deleted Successfully!");
  } catch (err) {
    log("deleteCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

// DELETE MANY CATEGORY
const deleteManyCategory = async (req, res) => {
  try {
    const result = await Category.deleteMany({ _id: { $in: req.body.ids } });

    if (!result.deletedCount)
      return rtnRes(res, 404, "No Categories Found to Delete");

    return rtnRes(res, 200, "Categories Deleted Successfully!");
  } catch (err) {
    log("deleteManyCategory error", "error", err.message);
    return rtnRes(res, 500, err.message);
  }
};

module.exports = {
  addCategory,
  addAllCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteCategory,
  deleteManyCategory,
  getAllCategories,
  updateManyCategory,
};
