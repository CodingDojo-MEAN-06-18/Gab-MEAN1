// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:

var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === "/cats") {
         fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });
    }
    else if (request.url === "/cars/new") {
         fs.readFile('./views/new_car.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });
    }
    else if(request.url === '/stylesheets/style.css'){
        fs.readFile('./stylesheets/style.css', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/audi-tt.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/audi-tt.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/bmw-x6.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/bmw-x6.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/tesla-s.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/tesla-s.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url === '/images/tesla-suv.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/tesla-suv.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
        })
    }
    else if(request.url === '/images/cutecat1.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cutecat1.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
        })
    }
    else if(request.url === '/images/cutecat2.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cutecat2.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
        })
    }
    else if(request.url === '/images/cutecat3.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cutecat3.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
        })
    }
    // request didn't match anything:
    else {
        response.end('The requested URL is not available!');
    }
});
// tell your server which port to run on
server.listen(7077);
// print to terminal window
console.log("Running in localhost at port 7077");
