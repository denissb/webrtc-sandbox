import {PeerConfig} from '../config/peer';

declare var Peer: any;

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

    getConnect(peerId) {
        return this.peer.connect(this.roomId + this.userId, {
            metadata: { 
                id: this.userId 
            }
        });
    }

    getRoomId(): string {
        return this.roomId;
    }
}