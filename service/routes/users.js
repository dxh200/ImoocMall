var express = require('express');
var router = express.Router();
require("../util/util")
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
    "cartList.$.num":productNum,
    "cartList.$.checked":productChecked
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

router.post('/checkedAll',(req,res,next)=>{
  let userId = req.cookies.userId;
  let checkedAll = req.body.checkedAll;
  users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        doc.cartList.forEach((item)=>{
          item.checked = checkedAll;
        })
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:1,
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:0,
              msg:'',
              result:'success'
            })
          }
        })
      }
    }
  })
})

//获得用户地址
router.get('/addressList',(req,res,next)=>{
  let userId = req.cookies.userId;
  users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:""
      })
    }else{
      res.json({
        status:0,
        msg:'',
        result:doc.addressList
      })
    }
  })
})

//
router.post('/setDefault',(req,res,next)=>{
  let userId = req.cookies.userId,addressId = req.body.addressId;
  if(addressId){
    users.findOne({userId:userId},(err,doc)=>{
      if(err){
        res.json({
          status:1,
          msg:err.message,
          result:''
        })
      }else{
        if(doc){
          doc.addressList.forEach((item)=>{
            if(item.addressId==addressId){
              item.isDefault = true;
            }else{
              item.isDefault = false;
            }
          })
          doc.save((err1,doc1)=>{
            if(err1){
              res.json({
                status:1,
                msg:err1.message,
                result:''
              })
            }else{
              res.json({
                status:0,
                msg:'',
                result:'success'
              })
            }
          })
        }
      }
    })
  }else{
    res.json({
      status:1,
      msg:'addressId is Null',
      result:''
    })
  }
})

router.post('/delAddress',(req,res,next)=>{
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  users.update({userId:userId},{
    $pull:{
      addressList:{
        addressId:addressId
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

router.post('/payment',(req,res,next)=>{
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  let orderTotal = req.body.orderTotal;

  users.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      });
    }else{
      if(doc){
        let goodsList=[],addressInfo='';
        doc.cartList.forEach((item)=>{
          if(item.checked==1){
            goodsList.push(item);
          }
        })
        try{
          doc.addressList.forEach((item)=>{
            if(item.addressId==addressId){
              addressInfo = item;
              throw Error();
            }
          })
        }catch(e){}

        let r1 = Math.floor(Math.random()*10)
        let r2 = Math.floor(Math.random()*10)
        let orderCreate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        let sysDate = new Date().Format("yyyyMMddhhmmss")

        let orderId = 'DXH'+r1+sysDate+r2;
        var order={
          orderId:orderId,
          orderTotal:orderTotal,
          goodsList:goodsList,
          addressInfo:addressInfo,
          orderCreate:sysDate,
          orderStatus:1,
        }
        doc.orderList.push(order);
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:1,
              msg:err1.message,
              result:''
            })
          }else{
            res.json({
              status:0,
              msg:'',
              result:{
                orderId:order.orderId,
                orderTotal:order.orderTotal
              }
            })
          }
        })
      }
    }
  })
})

router.post('/orderDetail',(req,res,next)=>{
  let userId = req.cookies.userId,orderId = req.body.orderId;
  users.findOne({userId:userId},(err,userInfo)=>{
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else {
      if (userInfo) {
        var orderList = userInfo.orderList;
        if (orderList.length == 0) {
          res.json({
            status: 1,
            msg: '您还没有创建订单',
            result: ''
          })
        } else {
          var order = '';
          try {
            orderList.forEach((item) => {
              if (item.orderId == orderId) {
                order = item;
                throw Error();
              }
            })
          } catch (e) {}
          if(order){
            res.json({
              status: 0,
              msg: '',
              result: {
                orderId:order.orderId,
                orderTotal:order.orderTotal
              }
            })
          }else{
            res.json({
              status: 1,
              msg: '订单号错误',
              result: ''
            })
          }
        }
      } else {
        res.json({
          status: 1,
          msg: '用户信息错误',
          result: ''
        })
      }
    }
  })
})
module.exports = router;
