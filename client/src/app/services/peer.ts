import {PeerConfig} from '../config/peer';

declare var Peer: any;
declare var PEERS: Array<number>;

export class PeerService {
    private peer: any;
    private roomId: string;
    private userId: number;
    private id: string;

    constructor() {
        this.roomId = location.pathname.slice(1);
        this.userId = Math.floor(Math.random() * 100000),
        this.id = this.roomId + this.userId;
    }

    getPeer() {
        if (!this.peer) {
            this.peer = new Peer(this.id, PeerConfig);
        }

        return this.peer;
    }

    getCall(peerId, stream) {
        return this.peer.call(this.roomId + peerId, stream);
    }

    getRoomId() {
        return this.roomId;
    }
}