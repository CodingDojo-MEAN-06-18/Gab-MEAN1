// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it


// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get("/cars", function (request, response){
  var cars_array = [
    {name: "audi", img_source: "/images/audi-tt.jpg"}, 
    {name: "bmw", img_source: "/images/bmw-x6.jpg"}, 
    {name: "tesla-s", img_source: "/images/tesla-s.jpg"}, 
    {name: "tesla-suv", img_source: "/images/tesla-suv.jpg"}, 
  ];
  response.render('cars', {cars: cars_array});
})

app.get("/cats", function (request, response){
  var cats_array = [
    {name: "cat1", img_source: "/images/cutecat1.jpg"}, 
    {name: "cat2", img_source: "/images/cutecat2.jpg"}, 
    {name: "cat3", img_source: "/images/cutecat3.jpg"}, 
  ];
  response.render('cats', {cats: cats_array});
})

app.get("/cats/cat1", function (request, response){
  // hard-coded user data
  var cat1_array = [
    {info: "yellow"}, 
    {info: "I fit in the palm of your hand!"}, 
    {info: "I'm soft and fluffy"}, 
];
  response.render('cat_info', {info: cat1_array});
})

app.get("/cats/cat2", function (request, response){
  // hard-coded user data
  var cat2_array = [
    {info: "gray striped"}, 
    {info: "I like wearing socks"}, 
    {info: "high five!"}, 
];
  response.render('cat_info', {info: cat2_array});
})

app.get("/cats/cat3", function (request, response){
  // hard-coded user data
  var cat3_array = [
    {info: "light brown"}, 
    {info: "I wanna go outside"}, 
    {info: "please?"}, 
];
  response.render('cat_info', {info: cat3_array});
})

app.get("/new", function (request, response){
  response.render('new');
})

// use app's get method and pass it the base route '/' and a callback
app.get('/', function(request, response) {
    // just for fun, take a look at the request and response objects
   console.log("The request object", request);
   console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   response.send("<h1>Hello Express</h1>");
})
// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})