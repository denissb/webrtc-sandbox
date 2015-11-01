(function() {
	window.onload = function() {
		init();
	}

	function init() {
		var userId = Math.floor(Math.random() * 100000),
			id = window.location.pathname.slice(1) + userId;
			
		//document.getElementById('call').addEventListener('click', callPeers);
		document.getElementById('send').addEventListener('click', function() {	
			chatBox.innerHTML+= '<p>You: ' + messageFiled.value + '</p>';
		});
		
		document.getElementById('fullScreen').addEventListener('click', function() {
			if (videoContainer.requestFullscreen) {
				videoContainer.requestFullscreen();
			} else if (videoContainer.webkitRequestFullscreen) {
				videoContainer.webkitRequestFullscreen();
			} else if (videoContainer.mozRequestFullScreen) {
				videoContainer.mozRequestFullScreen();
			} else if (videoContainer.msRequestFullscreen) {
				videoContainer.msRequestFullscreen();
			}
		});

		var chatBox = document.getElementById('chatBox'),
			videoContainer = document.getElementById('videoContainer');
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

		// Instantly calling all peers
		joinPeers();
		callPeers();	

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
			PEERS.forEach(join);
		}

		function callPeers() {
			// Still needs some DOM magic (create <video> elements on the fly per peer)
			PEERS.forEach(call);
		}

		function join(peerId) {
			var conn = peer.connect(window.location.pathname.slice(1) + peerId, {metadata: {id: userId}});

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

			navigator.getUserMedia({video: false, audio: true}, function(stream) {
				var call = peer.call(window.location.pathname.slice(1) + peerId, stream);
				call.on('stream', function(remoteStream) {
					var videoElement = document.createElement('video'),
						windowURL = window.URL || window.webkitURL;

					videoElement.style.width = '30%';	
					videoElement.src = windowURL.createObjectURL(remoteStream);
					videoContainer.appendChild(videoElement);
					videoElement.play();

					document.getElementById('fullScreen').style.display = "inline-block";
				});
			}, function(err) {
				console.log('Failed to get local stream' ,err);
			});
		}

		peer.on('call', function(call) {
			/*if (!confirm('Answer the call?')) {
				return;
			}*/

			navigator.getUserMedia({video: false, audio: true}, function(stream) {
				call.answer(stream); // Answer the call with an A/V stream.
				call.on('stream', function(remoteStream) {
					var videoElement = document.createElement('video'),
						windowURL = window.URL || window.webkitURL;

					videoElement.style.width = '30%';	
					videoElement.src = windowURL.createObjectURL(remoteStream);
					videoContainer.appendChild(videoElement);
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
