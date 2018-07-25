const quotes = require('../controllers/quotes.js')

module.exports = function (app){
	
	//routes from controller 
	app.get('/', function(req, res) { 
	   quotes.index(req,res);
	});

	app.get('/quotes', function(req,res){
		//grab all quotes and pass into view
		quotes.get_quotes(req,res);
	});

	app.post('/quotes', function(req, res) {
		console.log("POST DATA", req.body);
		//create a new Quote from req.body
	 	quotes.post_quote(req,res);
	});

};
