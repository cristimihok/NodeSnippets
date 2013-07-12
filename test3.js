// Include http module,
var http = require("http");
// And url module, which is very helpful in parsing request parameters.
   url = require("url");
   sys = require("sys");
 
// Create the server.
http.createServer(function (request, response) {
   // Attach listener on end event.
   request.on('end', function () {
      // Parse the request for arguments and store them in _get variable.
      // This function parses the url from request and returns object representation.
      var get = url.parse(request.url, true).query;
      // Write headers to the response.
      response.writeHead(200, {
         'Content-Type': 'text/plain'
      });
      // Send data and end response.
      console.log(get);
      response.end('Here is your data: ' + get[0]);
   });
// Listen on the 8080 port.
}).listen(8080);

sys.puts("Server running on http://localhost:8080");