var sys = require("sys"),  
http = require("http");  

http.createServer(function(request, response) {  
	response.writeHeader(200, {"Content-Type": "text/html"});  
	response.write("Hello Yonder!");  
	response.end();  
}).listen(8080);  

sys.puts("Server running at http://localhost:8080/");  