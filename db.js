const mongoose = require("mongoose");

const dbConnection = ()=>{
    const db = mongoose.connect(process.env.MONGO_URL);

db.then(()=>{
    console.log("db connected")
})
db.catch(()=>{
    console.log("db not connected")
})

};

module.exports = dbConnection;
