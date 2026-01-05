const express = require("express");
const Product = require("../model/Product");

const itemcreate = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const {
      name,
      price,
      description,
      category,
      brand,
      stock,
      ratings,
      discount,
      weight,
      color,
      material,
      suppliername,
    } = req.body;

    if (!name || !category || !price || !description) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const existingproduct = await Product.findOne({
      name,
      description,
      price,
      category,
    });

    if (existingproduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // if (!stock || stock <= 0) {
    //   return res.status(400).json({ message: "Unavailable stock" });
    // }

    if (ratings < 1 || ratings > 5) {
      return res
        .status(400)
        .json({ message: "Ratings must be between 1 and 5" });
    }

    const allowcategory = ["men", "women", "kid"];
    if (!allowcategory.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const brandallow = ["Nike", "Sony", "samsang", "addidas", "apple"];
    if (brand && !brandallow.includes(brand)) {
      return res.status(400).json({ message: "Invalid brand" });
    }
    const image = req.file ? req.file.filename : null;
    if (!image) {
      return res.status(400).json({ message: "Image required" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      brand,
      stock,
      category: req.body.category.toLowerCase(),
      ratings,
      discount,
      weight,
      color,
      material,
      suppliername,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const productbyId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const productupdate = async (req, res) => {
  try {
    const { name, price, stock, category, description } = req.body || {};

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updateData = {
      name,
      price,
      stock,
      category,
      description,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Product update failed" });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res
      .status(200)
      .json({
        message: "product deleted successfully",
        deletedproduct: product,
      });
  } catch (error) {
    console.error("Error fetching user data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ message: "product list", products: products });
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
const uploadproductImg = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    product.avatar = req.file.filename;
    await product.save();

    return res.status(200).json({
      message: "Avatar uploaded successfully",
      updateProduct: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  itemcreate,
  productbyId,
  productupdate,
  deleteproduct,
  listProducts,
  uploadproductImg,
};
