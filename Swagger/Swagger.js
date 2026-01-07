// const path = require("path");
// const fs = require("fs");
// const swaggerUi = require("swagger-ui-express");


// const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "Swagger.json"), "utf8"));

// module.exports = function(app) {
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//     console.log("Swagger url:https://localhost:8597/api-docs");
// }

// const path = require("path");
// const fs = require("fs");
// const swaggerUi = require("swagger-ui-express");

// const swaggerDocument = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "Swagger.json"), "utf8")
// );

// module.exports = function (app) {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//   console.log("Swagger url: http://localhost:8597/api-docs");
// };


const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

const swaggerPath = path.join(__dirname, "Swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

module.exports = function (app) {
  // 🔥 Auto detect production
  if (process.env.NODE_ENV === "production") {
    swaggerDocument.servers = [
      {
        url: "https://onecard-backend-myog.onrender.com",
        description: "Production Server"
      }
    ];
  }

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log("Swagger running at /api-docs");
};
