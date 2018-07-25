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
app.get('/', function(req, res) {
	res.render("index");
})

//listen to connection even from the client side
io.sockets.on('connection', function (socket){

	console.log("io connection");

	//server listens to "posting_form" event
	socket.on("button_pushed", function (data){

		counter++;
		//will emit the data to the client
		//   socket.emit('updated_message', {response: data}); 
		console.log("button pushed event received by the server");
		console.log("counter: " + counter);
		//   socket.emit('count_updated', {response: counter}); 
	  socket.emit('count_updated', counter); 
	})
	console.log("<- io connection");
})

// app.get('/', function(req, res) {
// 	res.render("index");
// })
  
    
// io.on('posting_form', function (socket) { //2
  
// 	console.log("received posting_form");

// 	socket.on('posting_form', function (data){
// 		socket.emit('updated_message', { response: data }); //3
// 		var random_number = Math.floor((Math.random() * 1000) + 1);
// 		socket.emit('random_number', {response: random_number});
// 	})

//   socket.on('thankyou', function (data) { //7
//     console.log(data.msg); //8 (note: this log will be on your server's terminal)
//   });
    
// });
