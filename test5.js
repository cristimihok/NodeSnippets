var http = require('http');
var fs = require('fs');
var path = require('path');
var sys = require('sys');
http.createServer(function (request, response) {   
	console.log(request);
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.htm';
		
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}	
		
	var data = '';
	request.on('data', function(chunk) { 
		data += chunk; 
		sys.puts(data);
	});
	
	

	path.exists(filePath, function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
	
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');