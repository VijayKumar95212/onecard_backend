// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// // Local imports
// const dbConnection = require("./db");
// const OneCardRouter = require("./router/oneCardUser");
// const ProductRouter = require("./router/Product");
// const setupSwagger = require("./Swagger/Swagger");

// dotenv.config();

// // =======================
// // MIDDLEWARES
// // =======================
// app.use(express.json());

// // ✅ CORS FIX (Local + Production)
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://onecard-backend-myog.onrender.com"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   })
// );

// // =======================
// // STATIC FILES
// // =======================
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "assets/image"))
// );

// // =======================
// // TEST ROUTE
// // =======================
// app.get("/", (req, res) => {
//   res.send("OneCard Backend is running 🚀");
// });

// // =======================
// // ROUTES
// // =======================
// app.use("/api", OneCardRouter);
// app.use("/api/product", ProductRouter);

// // =======================
// // SWAGGER
// // =======================
// setupSwagger(app);

// // =======================
// // SERVER START
// // =======================
// const PORT = process.env.PORT || 8597;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   dbConnection();
// });


const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// =======================
// LOCAL IMPORTS
// =======================
const dbConnection = require("./db");
const OneCardRouter = require("./router/oneCardUser");
const ProductRouter = require("./router/Product");
const setupSwagger = require("./Swagger/Swagger");

dotenv.config();

// =======================
// 🔥 CORS — MUST BE FIRST
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://vijay-one-card-project.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Explicit preflight handler (Render-safe)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());

// =======================
// STATIC FILES
// =======================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "assets/image"))
);

// =======================
// HEALTH CHECK
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
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});
