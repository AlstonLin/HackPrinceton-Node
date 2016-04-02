var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(PORT);
console.log('Express server started on port %s', PORT);
