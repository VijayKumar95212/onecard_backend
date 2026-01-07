const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Local imports
const dbConnection = require("./db");
const OneCardRouter = require("./router/oneCardUser");
const ProductRouter = require("./router/Product");
const setupSwagger = require("./Swagger/Swagger");

dotenv.config();

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());

// ✅ CORS FIX (Local + Production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://onecard-backend-myog.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// =======================
// STATIC FILES
// =======================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "assets/image"))
);

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("OneCard Backend is running 🚀");
});

// =======================
// ROUTES
// =======================
app.use("/api", OneCardRouter);
app.use("/api/product", ProductRouter);

// =======================
// SWAGGER
// =======================
setupSwagger(app);

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 8597;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  dbConnection();
});
