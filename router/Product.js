const multer = require("multer");
const ProductController = require("../controller/Product");
const express = require("express");
const ProductRouter = express.Router();


// ProductRouter.post("/itemcreate",ProductController.itemcreate);
ProductRouter.get("/productbyId/:id",ProductController.productbyId);
// ProductRouter.put("/productupdate/:id",ProductController.productupdate);
ProductRouter.delete("/deleteproduct/:id",ProductController.deleteproduct);
ProductRouter.get("/listproducts",ProductController.listProducts);

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, "assets/image"); // FIXED FOLDER NAME
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



ProductRouter.post(
  "/itemcreate",
  upload.single("image"), // 🔥 MUST MATCH frontend
  ProductController.itemcreate
);
// const upload = require("../middleware/multer");

ProductRouter.put(
  "/productupdate/:id",
  upload.single("image"), // ✅ THIS IS REQUIRED
  ProductController.productupdate
);






module.exports=ProductRouter;