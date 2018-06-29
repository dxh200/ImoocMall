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

router.get("/list",(req,res,next)=>{
  let sort = req.query.sort;
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let priceCheked = req.query.priceChecked;
  let priceGe = parseInt(req.query.sprice);
  let priceLe = parseInt(req.query.eprice);

  //是不数字
  if(Number.isNaN(page)){
    page = 1;
  }
  //不是数字
  if(Number.isNaN(pageSize)){
    pageSize = 8;
  }
  let params = {};

  if(priceCheked!="All"){
    params = {
      price:{
        $gte:priceGe,
        $lte:priceLe
      }
    }
  }
  let priceSort = {"price":sort};
  let skip = (page-1)*pageSize;

  let goodsModel = goods.find(params);
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

router.post("/addCart",(req,res,next)=>{
  //获得session用户Id
  let userId = req.cookies.userId;
  //获得productId,需要加入的商品
  let productId = req.body.productId;

  const users = require("../models/Users");
  //
  users.findOne({userId:userId},(err,userDoc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message
      })
    }else{
      if(userDoc){

        let goodsItem = "";
        userDoc.cartList.forEach((item)=>{
          if(item.id==productId){
            item.num ++;
            goodsItem = item;
          }
        })

        if(goodsItem){
          userDoc.save((err3)=>{
            if(err3){
              res.json({
                status:1,
                msg:err3.message
              });
            }else{
              res.json({
                status:0,
                msg:"",
                result:"success"
              });
            }
          })
        }else{
          goods.findOne({id:productId},(err1,productDoc)=>{
            if(err1){
              res.json({
                status:1,
                msg:err1.message
              });
            }else{
              let doc_ = productDoc._doc;
              doc_.num = 1;
              doc_.checked = 1;
              userDoc.cartList.push(doc_);
              userDoc.save((err2)=>{
                if(err2){
                  res.json({
                    status:1,
                    msg:err2.message
                  });
                }else{
                  res.json({
                    status:0,
                    msg:"",
                    result:"success"
                  });
                }
              })
            }
          })
        }
      }
    }
  })

})

module.exports = router;

