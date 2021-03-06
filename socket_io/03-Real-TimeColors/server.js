const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
// const server = app.listen(1337);
// const io = require('socket.io')(server);
var counter = 0;

// path module -- try to figure out where and why we use this
const path = require("path");

const bodyParser = require('body-parser');

// const session = require('express-session');

// const sessionConfig  = {
//   saveUninitialized: true,
//   resave: false,
//   name: 'session',
//   secret: 'thisIsSuperSekret'
// };

// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));

// app.use(session(sessionConfig));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view

  // tell the express app to listen on port 8000
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

//we're going to have /routes/index.js handle all of our routing
// var route = require('./routes/index.js')(app, server);

var io = require('socket.io').listen(server) 

// root route to render the index.ejs view
// app.get('/', function(req, res) {
// 	res.render("index");
// })

var route = require('./routes/index.js')(app, server);
    
// });
