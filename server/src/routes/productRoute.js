const express = require("express");
const router = express.Router();

const { addProduct, addAllProducts,
     getAllProducts, getProductBySlug,
     getProductById, updateProduct,
     updateStatus, deleteProduct,
     deleteManyProducts } = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");

router.post("/addProduct", upload.array("images", 5), addProduct);
router.post("/addProduct/bulk", addAllProducts);

router.get("/getProduct", getAllProducts);
router.get("/getProduct/:slug", getProductBySlug);
router.get("/getProduct/id/:id", getProductById);

router.put("/updateProduct/:id", upload.array("images", 5), updateProduct);

router.patch("/updateProduct/:id/status", updateStatus);

router.delete("/deleteProduct/:id", deleteProduct);
router.delete("/deleteProduct", deleteManyProducts);

module.exports = router