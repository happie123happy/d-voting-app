const mysql=require('mysql');

const connection=mysql.createConnection(config:{
    host:'localhost',
    port:3306,
    database:'aadhar',
    user:'root',
    password:''
});