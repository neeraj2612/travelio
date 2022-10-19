
var con = require('./connection')
var mysql = require("mysql");
const express = require("express");
var app = express();
var bodyParser = require('body-parser');

module.exports = con;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));




var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"form",
})

app.get('/',function(req,res){
    res.sendFile(__dirname+'/contact.html');

});

app.post('/',function(req,res){
    var name = req.body.name;
    var email = req.body.email;

    con.connect(function(error){
        if(error) throw error;
        
        var sql = "INSERT INTO FORMSUBMISSION (name , email) VALUES('"+name+"','" +email+"')";
        con.query(sql,function(error,result){
            if(error) throw error;
            res.send('recorded' + result.insertid);
        
    });
}),

app.listen(7000);
