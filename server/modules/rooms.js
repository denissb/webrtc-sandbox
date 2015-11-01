var Rooms = function() {
	var list = [];

	function findIndex(roomId) {
		for (var i = 0, length = list.length; i < length; i++) {
			if (list[i].id === roomId) {
				return i;
			}
		}

		return -1;
	}

	return {
		getPeers: function(roomId) {
			if (!roomId) {
				throw Error('A valid room Id should be provided!');
			}

			var index = findIndex(roomId);

			if (index > -1) {
				return list[index].peers;
			}

			return [];
		},
		add: function (roomId, peerId) {
			var index = findIndex(roomId);

			if (index > -1) {
				list[index].peers.push(peerId);
				return list[index].peers;
			}

			list.push({
				id: roomId,
				peers: [peerId]
			});

			return [peerId];
		},
		remove: function (roomId, peerId) {
			var index = findIndex(roomId);

			if (index > -1) {
				var targetRoom = list[index],
					peerIndex = targetRoom.peers.indexOf(peerId);

				if (peerIndex > -1) {
					targetRoom.peers.splice(peerIndex, 1);

					if (targetRoom.peers.length === 0) {
						list.splice(index, 1); 
					}

					return true;
				} else {
					throw Error('Could not find specified peer!')
				}
			} else {
				throw Error('Could not find specified room');
			}
		}
	}
}

module.exports = Rooms;