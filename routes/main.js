var express = require('express');
var router = express.Router();

var conn=require('../database');

router.get('/form', function(req, res, next) {
  if(req.session.loggedinUser){
    res.render('voter-registration.ejs')
  }else{
    res.redirect('/login');
  }
});


var getAge = require('get-age');

var account_address;
var data;

router.post('/registerdata',function(req,res){
    var dob=[];
    data=req.body.aadharno;    
    console.log(data);
    account_address = req.body.account_address;

  let sql = "SELECT * FROM aadhar_info WHERE Aadharno = ?";   
    conn.query(sql, data, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }

      dob = results[0].Dob;
        var email=results[0].Email;
        age = getAge(dob);
        is_registerd=results[0].Is_registered;
        if (is_registerd!='YES')
        {
          if (age>=18)
          {
            res.render('emailverify.ejs');
          }
          else
          {
            res.send('You cannot vote as your age is less than 18');
          }
        }
        else    //IF USER ALREADY REGISTERED
        {
          res.render('voter-registration.ejs',{alertMsg:"You are already registered. You cannot register again"});
        }
        
    });
})

router.post('/otpverify', (req, res) => {
    var otp = req.body.otp;
    if (otp=="1111") 
    {
        var record= { Account_address: account_address, Is_registered : 'Yes' };
        var sql="INSERT INTO registered_users SET ?";
        conn.query(sql,record, function(err2,res2)
          {
              if (err2){
             throw err2;
            }
              else{
                var sql1="Update aadhar_info set Is_registered=? Where Aadharno=?";
                var record1=['YES',data]
                console.log(data)
                conn.query(sql1,record1, function(err1,res1)
                {
                   if (err1) {
                    res.render('voter-registration.ejs');
                   }
                   else{
                    console.log("1 record updated");
                    var msg = "You are successfully registered";
                    res.render('voter-registration.ejs',{alertMsg:msg});                 
                  }
                }); 
               
              }
          }); 
    }
    else 
    {
       res.render('voter-registration.ejs',{alertMsg:" You have entered wrong OTP "});
    }
})


module.exports = router;