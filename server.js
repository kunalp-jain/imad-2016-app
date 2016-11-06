var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Introduction.html'));
});



var comments = [];
app.get('/:submit-comment', function(req, res) { // /submit-name?name=xxxx
  // Get the name from the request
  var comment = req.query.comment;

  comments.push(comment);
  // JSON: Javascript Object Notation
  res.send(JSON.stringify(comments));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/bigdata', function (req, res) {
  res.send("this is a big amount of text");
});





app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
