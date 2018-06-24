const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const goods = require("../models/Goods");

//链接字符串
const DB_URL = "mongodb://127.0.0.1:27017/mall";
//const DB_URL_USER_PASS = "mongodb://root:123456@127.0.0.1:27017/mall":
mongoose.connect(DB_URL);
mongoose.connection.on("connected",()=>{
  console.log("数据库链接成功");
})
mongoose.connection.on("error",(err)=>{
  console.log("数据库链接失败");
})
mongoose.connection.on("disconnected",()=>{
  console.log('Mongoose connection disconnected 链接断开');
})

router.get("/",(req,res,next)=>{
  let sort = req.query.sort;
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  //是不数字
  if(Number.isNaN(page)){
    page = 1;
  }
  //不是数字
  if(Number.isNaN(pageSize)){
    pageSize = 8;
  }
  let params = {};
  let priceSort = {"price":sort};
  let skip = (page-1)*pageSize;

  let goodsModel = goods.find({});
  goodsModel.sort(priceSort);
  goodsModel.skip(skip).limit(pageSize).exec((err,data)=>{
    if(err){
      res.json({
        status:"1"
        ,msg:err.message
      });
    }else{
      res.json({
        status:"0"
        ,msg:""
        ,result:{
          count:data.length,
          list:data
        }
      });
    }
  });
})

module.exports = router;

