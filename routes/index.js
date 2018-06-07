var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let Emp = require('../models/Employees');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/display',function(req,res)
  {
      Emp.find({}, function(err,response)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.render('display',{"result":response});
      }
  });
  });
  
  router.post('/register',function(req,res)
  {
    Emp.create({"name":req.body.name,"email":req.body.email,"password":req.body.password,"phone":req.body.phone}, 
      function(err,response)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
        res.redirect('/display');
        }
  });
  });

  router.get('/delete',function(req,res)
  {
    var id = mongoose.Types.ObjectId(req.query.id);
      Emp.remove({"_id":id}, function(err,response)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.redirect('/');
      }
  });
  });

  router.get('/edit',function(req,res)
  {
    var id = mongoose.Types.ObjectId(req.query.id);
      Emp.find({"_id":id}, function(err,response)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.render('edit',{"result":response});
      }
  });
  });


  router.post('/editDetails',function(req,res)
  {
    var id  =mongoose.Types.ObjectId(req.body.id);
    const doc = {
    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone
    }
    
    console.log("responseId",id);

      Emp.update({"_id":id},doc, function(err,response)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.redirect('/display');
      }
  });
  });


  router.get('/addRecord',function(req,res)
  {
           res.redirect('/');
  });

  module.exports = router;

