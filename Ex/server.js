var http = require('http');
var fs = require('fs');
var path = require('path');
var sys = require('sys');

function getContentType (extName){
	var contentType = 'text/html';
	switch (extName) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	return contentType;	
}

function sendContent (response, filePath, contentType) {
	path.exists(filePath, function (exists) {	
		if ( exists ) {
			fs.readFile(filePath, function (error, content) {
				if ( error ) {
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
}

var todoList = new Array();

http.createServer(function (request, response) {  	

	if ( request.method == 'GET' ){
		console.log("GET");
		console.log(todoList);
		var filePath = request.url;		
		var contentType = getContentType(path.extname(filePath));
		sys.puts(contentType);
		sendContent(response, filePath, contentType);
	}
	
	if ( request.method == 'POST' ){
		console.log("POST");
		var data = '';
		request.on('data', function (chunk) { 
			data += chunk; 
			sys.puts(data);		
		});	
		
		request.on('end', function () {
			todoList.push(data);
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(data, 'utf-8');
		});
	}		
	
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');