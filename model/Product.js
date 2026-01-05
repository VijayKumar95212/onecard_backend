const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required : false
    },
    price:{
        type : String,
        required:false
    },
    description : {
        type:String,
        required:false
    },
  
  category: {
    type: String,
    enum: ["men", "women", "kid"],
    required: false,
    lowercase:true,
  },
    brand:{
        type:String,
        required:false
    },
    stock:{
        type:String,
        required:false
    },
    suppliername:{
        type:String,
        required:false
    },
    ratings:{
     type:String,
        required:false
    },
    discount:{
        type:String,
        required:false
        
    },
    weight:{
        type:String,
        required:false

    },
    color:{
        type:String,
        required:false
    },
    material:{
        type:String,
        required:false
    },
    avilablestocks:{
        type :String,
        required : false
    },
    brandallow:{
        type :String,
        required : false
    },
    existingproduct:{
        type :String,
        required : false
    },
   allowcategory:{
        type :String,
        required : false
    },
     avatar:{
        type:String,
        default:"",
        required:false,
    },
    image:{
        type:String,
        required:true,
    }

});

const Product = mongoose.model("Product",ProductSchema);

module.exports = Product;