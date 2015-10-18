var express = require('express'),
	app = express(),
	ExpressPeerServer = require('peer').ExpressPeerServer,
	port = process.env.PORT || 9000;

var server = app.listen(port);
console.log('Listening on port', port);

//PeerJS stuff
var options = {
    debug: process.env.DEBUG || true
}

app.use('/api', ExpressPeerServer(server, options));
app.use(express.static(__dirname + '/../client'));

server.on('connection', function (id) {
  console.log('User connected with #', id);
});

server.on('disconnect', function (id) {
  console.log('User disconnected with #', id);
});