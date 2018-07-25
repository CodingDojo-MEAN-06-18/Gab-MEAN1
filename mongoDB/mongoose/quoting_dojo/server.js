// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

// var mongoose = require('mongoose');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
// mongoose.connect('mongodb://localhost/basic_mongoose');

// var UserSchema = new mongoose.Schema({
// 	name: String,
// 	age: Number
//    })
//    mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
//    var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// // Use native promises
// mongoose.Promise = global.Promise;



// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
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


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})