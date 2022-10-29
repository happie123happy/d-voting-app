const mysql=require('mysql');
const { options } = require('../routes/router');

const connection=mysql.createConnection(config:{
    host:'localhost',
    port:3306,
    database:'aadhar',
    user:'root',
    password:''
});

connection.connect(options:function(err){
    if(err){
        console.log("error occured ");
    }
    else{
        console.log("Successs");
    }
});
