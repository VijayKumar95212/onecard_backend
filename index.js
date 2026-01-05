const express = require("express");
const app = express();
const dbConnection = require("./db")
const dotenv = require("dotenv");
const OneCardRouter = require("./router/oneCardUser");
const ProductRouter = require("./router/Product");
const cors = require("cors");
const setupSwagger = require("./Swagger/Swagger");
const path = require("path");


dotenv.config()
app.use(express.json());
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("hello")
})
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials:true
}));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "assets/image"))
);
app.use("/api",OneCardRouter);
app.use("/api/product",ProductRouter);
setupSwagger(app);




app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
    dbConnection();
})