const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const adminAuth = require("../middleware/adminAuth");
const multer = require("multer");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure "uploads" folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// CREATE a product (admin only)
router.post("/create", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: req.file ? req.file.path : undefined,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
});

// UPDATE a product (admin only)
router.put("/update/:id", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, category, stock } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    if (req.file) product.image = req.file.path;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

// DELETE a product (admin only)
router.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

// GET all products (admin only)
router.get("/all", adminAuth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

module.exports = router;
