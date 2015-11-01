(function() {
	window.onload = function() {
		init();
	}

	function init() {
		var id = window.location.pathname.slice(1) + Math.floor(Math.random() * 100000);
		document.getElementById('join').addEventListener('click', joinPeers);
		document.getElementById('call').addEventListener('click', callPeers);
		document.getElementById('send').addEventListener('click', function() {	
			chatBox.innerHTML+= '<p>You: ' + messageFiled.value + '</p>';
		});
		
		document.getElementById('fullScreen').addEventListener('click', function() {
			if (videoElement.requestFullscreen) {
				videoElement.requestFullscreen();
			} else if (videoElement.webkitRequestFullscreen) {
				videoElement.webkitRequestFullscreen();
			} else if (videoElement.mozRequestFullScreen) {
				videoElement.mozRequestFullScreen();
			} else if (videoElement.msRequestFullscreen) {
				videoElement.msRequestFullscreen();
			}
		});

		var chatBox = document.getElementById('chatBox'),
			videoElement = document.getElementById('videoElement');
			messageFiled = document.getElementById('message'),
			peer = new Peer(id, {host: 'localhost', port: 9000, path: '/api'}),
			connections = [],
			peerIds = [],
			navigator.getUserMedia = (
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia
			);

		function initEvents(conn) {
			chatBox.innerHTML+= '<p>' + conn.metadata.id +  ' joined</p>';

			conn.on('data', function(data) {
				chatBox.innerHTML += '<p>' + conn.metadata.id + ': '+ data + '</p>';
			});

			conn.on('close', function() {
				connections.splice(1, connections.indexOf(conn));
				peerIds.splice(1, peerIds.indexOf(conn.metadata.id));
				chatBox.innerHTML += '<p>' + conn.metadata.id + ' disconnected</p>';
			});

			document.getElementById('send').addEventListener('click', function() {
				conn.send(messageFiled.value);
			});
		}

		function joinPeers() {
			peers.forEach(join);
		}

		function callPeers() {
			// Still needs some DOM magic (create <video> elements on the fly per peer)
			//peers.forEach(call);
		}

		function join(peerId) {
			var conn = peer.connect(window.location.pathname.slice(1) + peerId, {metadata: {id: id}});

			peer.on('error', function() {
				chatBox.innerHTML += '<p>Failed to join ' + peerId + '</p>';
			});

			conn.on('open', function() {

				chatBox.innerHTML += '<p>You joined ' + peerId + '</p>';

				conn.on('data', function(data) {
					chatBox.innerHTML += '<p>' + peerId + ': '+ data + '</p>';
				});

				document.getElementById('send').addEventListener('click', function() {
					conn.send(messageFiled.value);
				});
			});
		}

		// MEDIA stuff
		function call(peerId) {

			navigator.getUserMedia({video: true, audio: true}, function(stream) {
				var call = peer.call(window.location.pathname.slice(1) + peerId, stream);
				call.on('stream', function(remoteStream) {
					var windowURL = window.URL || window.webkitURL;
					videoElement.src = windowURL.createObjectURL(remoteStream);
					videoElement.play();

					document.getElementById('fullScreen').style.display = "inline-block";
				});
			}, function(err) {
				console.log('Failed to get local stream' ,err);
			});
		}

		peer.on('call', function(call) {
			if (!confirm('Answer the call?')) {
				return;
			}

			navigator.getUserMedia({video: true, audio: true}, function(stream) {
				call.answer(stream); // Answer the call with an A/V stream.
				call.on('stream', function(remoteStream) {
					var windowURL = window.URL || window.webkitURL;
					videoElement.src = windowURL.createObjectURL(remoteStream);
					videoElement.play();

					document.getElementById('fullScreen').style.display = "inline-block";
				});
			}, function(err) {
				console.log('Failed to get local stream' ,err);
			});
		});

		peer.on('connection', function(conn) {
	   		initEvents(conn);
		});

	}
})();