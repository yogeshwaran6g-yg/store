const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/add", protect, admin, categoryController.addCategory);
router.post("/add/bulk", protect, admin, categoryController.addAllCategory);

router.get("/get/all", categoryController.getAllCategory);
router.get("/get/showing", categoryController.getShowingCategory);
router.get("/get/:id", categoryController.getCategoryById);

router.put("/update/:id", protect, admin, categoryController.updateCategory);
router.patch("/update/status/:id", protect, admin, categoryController.updateStatus);
router.put("/update/bulk", protect, admin, categoryController.updateManyCategory);

router.delete("/delete/:id", protect, admin, categoryController.deleteCategory);
router.delete("/delete/bulk", protect, admin, categoryController.deleteManyCategory);

module.exports = router;
