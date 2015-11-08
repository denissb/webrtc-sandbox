import '/lib/peerjs/peer.min';
import {PeerConfig} from '../config/peer';

declare var Peer: any;

export class PeerService {
    peer: any;
    roomId: string;
    userId: number;
    id: string;

    constructor() {
        this.roomId = location.pathname.slice(1);
        this.userId = Math.floor(Math.random() * 100000),
        this.id = this.roomId + this.userId;
    }

    getPeer() {
        if (!this.peer) {
            this.peer = new Peer(this.id, PeerConfig);
            this.bindEvents();
        }

        return this.peer;
    }

    bindEvents() {
        this.peer.on('error', err => {
            console.error(err);
        });
    }

    getCall(peerId, stream): any {
        return this.peer.call(this.roomId + peerId, stream);
    }

    getConnection(peerId): any {
        return this.peer.connect(this.roomId + peerId, {
            metadata: {
                id: this.userId 
            }
        });
    }

    getRoomId(): string {
        return this.roomId;
    }
}