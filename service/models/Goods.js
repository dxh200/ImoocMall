const mongoose = require("mongoose")
//模型
const productSchema = mongoose.Schema({
  id:{type:String},
  name:{type:String},
  price:{type:Number},
  img:{type:String}
})

//导出
module.exports = mongoose.model("Good",productSchema)

