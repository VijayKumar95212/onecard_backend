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

// ✅ CORS (Swagger + Browser + Postman + Curl SAFE)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:8597",
        "https://onecard-backend-myog.onrender.com"
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 REQUIRED for Swagger preflight
app.options("*", cors());

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
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});
