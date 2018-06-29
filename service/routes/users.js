var express = require('express');
var router = express.Router();
var users = require("../models/Users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',(req,res,next)=>{
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;
  users.findOne({userName:userName,userPwd:userPwd},(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:"/",
          maxAge:1000*60*30
        });
        res.cookie("userName",doc.userName,{
          path:"/",
          maxAge:1000*60*30
        });
        res.json({
          status:0,
          msg:"",
          result:{
            userName:doc.userName
          }
        })
      }else{
        res.json({
          status:1,
          msg:"用户名或密码错误",
          result:null
        })
      }
    }
  })
})

router.get('/logout',(req,res,next)=>{
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  })
  res.cookie("userName","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:0,
    msg:'',
    result:''
  })
})

router.get('/checkLogin',(req,res,next)=>{
  if(req.cookies.userId){
    res.json({
      status:0,
      msg:'',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:1,
      msg:'未登陆',
      result:''
    })
  }

})

router.post('/cartList',(req,res,next)=>{
  let userId = req.cookies.userId;
  users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:0,
          msg:'',
          result:doc.cartList
        });
      }
    }
  })
})

router.post('/cart/del',(req,res,next)=>{
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  users.update({
    userId:userId
  },{
    $pull:{
      cartList:{
        id:productId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:0,
          msg:'',
          result:'success'
        });
      }
    }
  })
})

router.post('/cartEdit',(req,res,next)=>{
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let productChecked = req.body.productChecked;
  users.update({
    "userId":userId,
    "cartList.id":productId
  },{
    "cartList.$.num":productNum
  },(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:0,
          msg:'',
          result:'success'
        });
      }
    }
  })
})

module.exports = router;
