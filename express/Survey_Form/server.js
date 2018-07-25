// require express
const express = require("express");
// path module -- try to figure out where and why we use this
const path = require("path");
// create the express app
const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');

const sessionConfig  = {
  saveUninitialized: true,
  resave: false,
  name: 'session',
  secret: 'thisIsSuperSekret'
};

// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));

app.use(session(sessionConfig));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view

app.get('/', function(req, res) {
  var form_data = [
    {name: req.body.name}, 
    {dojo: req.body.dojo_location}, 
    {language: req.body.fav_language}, 
    {comments: req.body.comments}, 
];
  res.render("index", {data: form_data});
})

// The submitted form gets sent to /result
app.post('/result', function(req, res) {
  var form_data = {
    name: req.body.name, 
    dojo: req.body.dojo_location, 
    language: req.body.fav_language, 
    comments: req.body.comments, 
  };
  res.render("result", {data: form_data});
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});


