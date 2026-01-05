const OneCardController = require("../controller/oneCardUser");
const express = require("express");
const OneCardRouter = express.Router();
const multer = require("multer");


OneCardRouter.post("/CreateUser",OneCardController.CreateUser);
OneCardRouter.get("/login",OneCardController.login);
OneCardRouter.post("/loginwithuser",OneCardController.loginWithUser);
OneCardRouter.get("/getbyid/:id",OneCardController.getbyid);
OneCardRouter.put("/update/:id",OneCardController.update);
OneCardRouter.delete("/deleteuser/:id",OneCardController.deleteUser);
OneCardRouter.post("/logout/:id",OneCardController.isLogout);    


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/image"); // FIXED FOLDER NAME
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


OneCardRouter.post(
  "/upload-avatar/:id",
  upload.single("avatar"),
  OneCardController.uploadAvatar
);


module.exports = OneCardRouter;