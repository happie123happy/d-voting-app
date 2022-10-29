var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/form', function(req, res, next) { 
res.render('users-form'); 
});

router.post('/create', function(req, res, next) {
  
  const userDetails=req.body;
 
  var sql = 'INSERT INTO users SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
  res.redirect('/users/form');

}); 

module.exports = router;