var express = require('express');
var mongoose = require('mongoose');
var connect = require('connect');
var app = express();
var ObjectId = require('mongodb').ObjectID;

bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var connection = mongoose.connect('mongodb://localhost:27017/db');

var Food = require('./food.js');
var User = require('./user.js');
var PORT = 3000;

app.get('/', function(req, res){
    res.send('Hello World');
});

app.post('/newuser', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var newUser = new User({
    "username": username,
    "password": password
  });
  newUser.save(function(err){
    if (err){
      res.json({
        "success" : false,
        "error" : err
      });
    } else {
      res.json({
        "success" : true
      });
    }
  });
});

// A very very shitty login system
app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username,
    password: password
  }, function (err, obj){
    if (obj == null){
      res.json({
        'success': false
      });
      console.log("Failed login");
    } else {
      res.json({
        'success': true,
        'id': obj.id
      });
      console.log("Successful login");
    }
  });
});

app.post('/newFood', function(req, res){
  var name = req.body.name;
  var calories = req.body.calories;
  var colesterol = req.body.colesterol;
  var fat = req.body.fat;
  var protien = req.body.protien;
  var carbs = req.body.carbs;
  var sugar = req.body.sugar;
  var sodium = req.body.sodium;
  var newFood = new Food({
    name: name,
    calories: calories,
    colesterol: colesterol,
    fat: fat,
    protien: protien,
    carbs: carbs,
    sugar: sugar,
    sodium: sodium,
    owner: req.body.user_id
  });
  newFood.save(function(err){
    if (err){
      console.log("Error saving food: " + err);
    } else{
      console.log("Successfully saved new food");
    }
    res.end("");
  });
});

app.listen(PORT);
console.log('Express server started on port %s', PORT);
