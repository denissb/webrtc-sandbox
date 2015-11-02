import {config} from '../config/peer';

declare var Peer: any;
declare var PEERS: Array<number>;

export class PeerService {
    public peer: any;
    private userId: number;
    private id: string;

    constructor() {
        this.userId = Math.floor(Math.random() * 100000),
        this.id = location.pathname.slice(1) + this.userId;

        this.peer = new Peer(this.id, config);
    }

    getPeer() {
        return this.peer;
    }
}