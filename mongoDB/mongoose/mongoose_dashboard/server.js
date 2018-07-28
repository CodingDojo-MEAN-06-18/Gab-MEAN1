// Require the Express Module
const express = require('express');
// Create an Express App
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 8000;
const { Schema } = mongoose;

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost:27017/squirrels');
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
	console.log('Mongoose default connection error: ' + err);
  }); 


// var UserSchema = new mongoose.Schema({
// 	name: String,
// 	age: Number
//    })
//    mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
//    var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// // Use native promises
// mongoose.Promise = global.Promise;

const SquirrelSchema = new mongoose.Schema({
	name: String,
	type: String
   })
   mongoose.model('Squirrel', SquirrelSchema); // We are setting this Schema in our Models as 'User'
var Squirrel = mongoose.model('Squirrel'); // We are retrieving this Schema from our Models, named 'User'

// Use native promises
mongoose.Promise = global.Promise;


// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
const path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// set up other middleware, such as session
const session = require('express-session');
const flash = require('express-flash');
app.use(flash());
app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 120 },
}));


// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app);

app.get('/', function (_req, res) {
	Squirrel.find({}, function(err, squirrels) {
		// res.render('index', {squirrel: squirrels});
		res.render('index', { squirrels });

	})
})


app.get('/squirrels/new', function(req, res) {
	res.render('new');
})


app.post('/squirrels', function(req, res) {
    var squirrel = new Squirrel({name: req.body.name, type: req.body.type});
    console.log(`Squirrel: ${squirrel}`);
    squirrel.save(function(err) {
        if(err) {
            console.log(err);
        } else { 
			console.log('added squirrel!');
			console.log(squirrel);
            // res.redirect('/');
		}
		res.redirect('/');
    })
})

app.get('/squirrels/edit/:id/', function(req, res){
    Squirrel.findById({ _id: req.params.id }, function(err, response) {
        console.log(req.params.id)
      if (err) {
		   console.log(err); 
		}
      res.render('edit', { squirrel: response });
    })
});


app.post('/squirrels/:id', function(req, res) {
	Squirrel.update({ _id: req.params.id}, req.body, function(err,response) {
		if(err) {
			console.log(err);
		}
		res.redirect('/');
	})
});


app.get('/squirrels/destroy/:id', function(req,res) {
	Squirrel.remove({ _id: req.params.id}, function(err,response) {
	   console.log("deleted squirrel" + req.params.id)
	   if(err){
		   console.log(err);
	   }
	   res.redirect('/');
   });
});


// Setting our Server to Listen on Port: 8000
app.listen(port, function() {
    console.log("listening on port" + port);
})