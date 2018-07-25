module.exports = function Route(app, server){
	// this gets the socket.io module
	var io = require('socket.io').listen(server) 
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
		res.render("index");
	})
	//listen to connection even from the client side
	io.sockets.on('connection', function (socket){

		//server listens to change color events
		socket.on("change_to_blue", function (data){
		  socket.emit('change_to_blue'); 
		})

		socket.on("change_to_green", function (data){
		  socket.emit('change_to_green'); 
		})

		socket.on("change_to_pink", function (data){
		  socket.emit('change_to_pink'); 
		})
	})
};


    
