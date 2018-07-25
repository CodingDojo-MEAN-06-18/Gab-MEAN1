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
  if(req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.render("index", {count: req.session.count});
})

// Ninja Level 1
// Add a +2 button underneath the counter that reloads the page and increments counter by 2. 
// Add another route to handle this functionality.
app.post('/plus2', function(req, res) {
  req.session.count++;
  res.redirect('/');
})

// Ninja Level 2
// Add a reset button that resets the counter back to 1. Add another route to handle 
// this functionality.
app.post('/reset', function(req, res) {
  req.session.destroy();
  res.redirect('/')
 })


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});


