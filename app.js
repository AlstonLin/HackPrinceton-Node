var express = require('express');
var mongoose = require('mongoose');
var connect = require('connect');
var multer = require('multer');
var app = express();
var ObjectId = require('mongodb').ObjectID;

bodyParser = require('body-parser');
app.use(express.static(__dirname + '/uploads'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var connection = mongoose.connect('mongodb://localhost:27017/db');

var Food = require('./food.js');
var User = require('./user.js');
var PORT = 3000;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    filename =  file.fieldname + Date.now();
    callback(null, filename);
  }
});
var upload = multer({ storage : storage }).single('image');

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
  console.log("Upload Request");
  upload(req, res, function(err, filename) {
    if (err) {
      console.log("ERROR UPLOADING: " + err);
      res.json({
        success: false
      });
    } else{
      console.log("Successfully Uploaded");
      // Creates entry
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
        owner: req.body.user_id,
        filename: filename
      });
      newFood.save(function(err){
        if (err){
          console.log("Error saving food: " + err);
          res.json({
            success: false
          });
        } else{
          console.log("Successfully saved new food");
          res.json({
            success: true
          });
        }
      });
    }
  });
});

app.post('/getFood', function(req, res){
  var user_id = req.body.user_id;
  Food.find({owner: ObjectId(user_id)}).sort({createdAt: -1}).exec(function(err, foods){
    if (err){
      console.log("Error while retrieving food: " + err);
      res.json({
        success: false
      })
    } else{
      console.log("Retrieved food: " + JSON.stringify(foods));
      res.json({
        success: true,
        data: foods
      })
    }
  });
});

app.listen(PORT);
console.log('Express server started on port %s', PORT);
