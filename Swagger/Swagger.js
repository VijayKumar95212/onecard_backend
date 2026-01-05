const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");


const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "Swagger.json"), "utf8"));

module.exports = function(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("Swagger url:http://localhost:8597/api-docs");
}