declare var fetch;

export class APIService {

    // Use Angular 2 Http?
    getPeers(roomId) {
        return fetch(`/api/room/${roomId}`);
    }

}