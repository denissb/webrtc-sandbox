import '/lib/peerjs/peer.min';
import {PeerConfig} from '../config/peer';

declare var Peer: any;

export class PeerService {
    peer: any;
    private static roomId: string;
    private static userId: string;
    id: string;

    constructor() {
        this.roomId = location.pathname.slice(1);
        this.userId = Math.floor(Math.random() * 16777215).toString(16), // Kudos to Paul Irish
        this.id = this.roomId + this.userId;
    }

    getPeer(): any {
        if (!this.peer) {
            this.peer = new Peer(this.id, PeerConfig);
            this.bindEvents();
        }

        return this.peer;
    }

    destroyPeer() {
        this.peer.destroy();
    }

    private bindEvents() {
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

    getUserId(): string {
        return this.userId;
    }
}