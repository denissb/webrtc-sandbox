import {Inject, EventEmitter} from 'angular2/angular2'
import {PeerService} from './peer'
import {NavigatorService} from './navigator'

export class ConnectService {
    peerService: PeerService;
    navigatorService: NavigatorService;
    dataEmitter: EventEmitter = new EventEmitter();
    mediaEmitter: EventEmitter = new EventEmitter();

    constructor(@Inject(PeerService) peerService: PeerService,
        @Inject(NavigatorService) navigatorService: NavigatorService) {

        this.peerService = peerService;
        this.navigatorService = navigatorService;
    }

    start(peers: Array<number>) {
        this.acceptData();
        this.acceptMedia();

        peers.forEach(peerId => {
            this.joinData(peerId);
            this.joinMedia(peerId)
        })
    }

    /**
       Emits an accepted DataConnection  
    **/   
    private acceptData() {
        var peer = this.peerService.getPeer();

        peer.on('connection', conn => {
            this.dataEmitter.next(conn);
        });
    }

    /**
      Emits a DataConnection from Peer.js
    **/  
    private joinData(peerId): any {
        var connection = this.peerService.getConnection(peerId);

        connection.on('open', () => {
            this.dataEmitter.next(connection);
        });
    }

    /**
        Emits an accepted MediaConnection
    **/
    private acceptMedia() {
        var peer = this.peerService.getPeer();
        //TODO: re-factor
        peer.on('call', call => {
            this.navigatorService.getUserMedia().then(stream => {
                call.answer(stream);
                call.on('stream', stream => {
                    this.mediaEmitter.next(stream);
                });
            }, err => {
                console.error(err);
            });
        });
    }

    /**
      Emits a MediaConnection from Peer.js
    **/  
    private joinMedia(peerId): any {
        this.navigatorService.getUserMedia().then(stream => {
            var call = this.peerService.getCall(peerId, stream);
            call.on('stream', stream => {
                this.mediaEmitter.next(stream);
            })
        }, err => {
            console.error(err);
        });
    }

    getDataStream(): any {
        return this.dataEmitter.toRx();
    }

    getCallStream(): any {
        return this.mediaEmitter.toRx();
    }

    getRoomId(): string {
        return this.peerService.getRoomId();
    }
}