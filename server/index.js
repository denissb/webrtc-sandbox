var express = require('express'),
	app = express(),
	PeerServer = require('peer').PeerServer,
	port = process.env.PORT || 3000,
	path = require('path'),
	clientFolder = path.resolve(__dirname + '/../client'),
	rooms = require('./modules/rooms');

var server = app.listen(port),
	peerRooms = rooms();

// Setting up express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(clientFolder));

console.log('Listening on port', port);

app.get('/', function (req, res) {
	var randomPeerId = (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
	res.redirect('/' + randomPeerId);
});

app.get('/[\\w]{16}', function (req, res) {
    var roomId = req.path.substring(1);
	res.render('index');
});

app.get('/api/room/:id', function (req, res) {
    res.json({
        peers: peerRooms.getPeers(req.params.id)
    });
})

//PeerJS stuff
var peerServer = PeerServer({port: 9000, path: '/connect', proxied: true});

peerServer.on('connection', function (id) {
  var peerId = id.slice(16),
  	  roomId = id.slice(0, 16);

  peerRooms.add(roomId, peerId);
  console.log('User connected with #', id);

  console.log(peerRooms.getPeers(roomId));
});

peerServer.on('disconnect', function (id) {
  var peerId = id.slice(16),
  	  roomId = id.slice(0, 16);

  peerRooms.remove(roomId, peerId);

  console.log('User disconnected with #', id);
});