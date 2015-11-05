declare var fetch;

export class APIService {

    getPeers(roomId) {
        return fetch(`/api/room/${roomId}`);
    }

}