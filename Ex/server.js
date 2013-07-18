var http = require('http');
var fs = require('fs');
var path = require('path');
var sys = require('sys');

function getContentType ( extName ){
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

function sendContent ( response, filePath, contentType ) {
	path.exists(filePath, function ( exists ) {	
		if ( exists ) {
			fs.readFile(filePath, function ( error, content ) {
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

function sendList (response, list) {
	response.writeHead(200, { 'Content-Type': "text/plain" });
	response.end(list, 'utf-8');
}

function deleteSelectedData (selectedData) {
	for (var i = todoList.length-1; i >= 0 ; i--){
		console.log("elem " + i + ": " + todoList[i]);
		console.log("delTODOList: " + todoList);

		if ( include(selectedData, todoList[i])===true){
			todoList.splice(i, 1);
			console.log("delete index: " + i);
		}
	}
}

function include (array, elem){
	console.log("enter include: " + elem);
	for(var i = 0; i < array.length; i++) {
        if (array[i] === elem) {
        	console.log("found: " + elem);
        	return true;
        }
        	
    }
}

var todoList = new Array();

http.createServer(function ( request, response ) {  	

	if ( request.method == 'GET' ){
		console.log("GET");
		//console.log("url:" + request.url);
		//console.log(todoList);
		if (request.url != "/Ex/null"){
			var filePath = request.url;		
			var contentType = getContentType(path.extname(filePath));
			//sys.puts(contentType);
			sendContent(response, filePath, contentType);
		} else {
			jtodoList = JSON.stringify(todoList);
			sendList(response, jtodoList);
		}		
	}
	
	if ( request.method == 'POST' ){
		console.log("POST");
		var data = '';
		request.on('data', function ( chunk ) { 
			data += chunk; 
			sys.puts(data);		
		});	
		
		request.on('end', function () {
			if ( data ){
				todoList.push(data);
				response.writeHead(200);
				response.end();
			} else {
				response.writeHead(500);
				response.end();
			}			
		});
	}

	if ( request.method == 'DELETE'){
		console.log("DELETE");
		console.log("todoList: " + todoList);		
		var data = '';
		request.on('data', function ( chunk ) { 
			data += chunk; 		
		});

		request.on('end', function () {
			if ( data ){				
				console.log("before delete: " + todoList);
				var selectedData = JSON.parse(data);
				console.log("selectedData: " + selectedData);
				deleteSelectedData(selectedData);
				console.log("after delete: " + todoList);
				response.writeHead(200);
				response.end();
			} else {
				response.writeHead(500);
				response.end();
			}			
		});

	}		
	
}).listen(8080, '0.0.0.0');
console.log('Server running at http://127.0.0.1:8080/');