const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  "userId" : String,
  "userName" : String,
  "userPwd" : String,
  "orderList" : Array,
  "addressList":[
    {
      "addressId" : String,
      "userName" : String,
      "streetName" : String,
      "postCode" : Number,
      "tel" : Number,
      "isDefault" : Boolean
    }
  ],
  "cartList" : [
    {
      "id" : String,
      "name" : String,
      "price" : String,
      "img" : String,
      "checked":String,
      "num":String
    }
  ]
});

module.exports = mongoose.model("Users",userSchema,"users");
