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

module.exports = router;
