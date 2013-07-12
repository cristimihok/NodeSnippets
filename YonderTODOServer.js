var sys = require("sys"),
	http = require("http"),
	path = require("path"),
	url = require("url")
	filesys = require("fs");

	http.createServer( function ( request, respons ) {
		var myPath = url.parse( request.url ).pathname;
		var fullPath = path.join ( process.cwd(), myPath );
		path.exists ( fullPath, function ( exists ) {
			if ( !exists ){
				respons.writeHeader ( 404, { "Content-Type": "text/plain" } );
				respons.write ( "404 Not Found\n" );
				respons.end;
			} else {
				filesys.readFile ( fullPath, "binary", function ( err, file ) {

				} )
			}
		} )
	}).listen(8080);