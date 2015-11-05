import {Inject} from 'angular2/core';
import {PeerService} from './peer'
import {NavigatorService} from './navigator'

export class ConnectService {
    peerService: PeerService;
    navigatorService: NavigatorService;

    constructor(@Inject(PeerService) peerService: PeerService,
        @Inject(NavigatorService) navigatorService: NavigatorService) {

        this.peerService = peerService;
        this.navigatorService = navigatorService;
    }

    start(peers: Array<number>) {
        this.peerService.getPeer();

        // This is just temporary here
        this.navigatorService.getUserMedia().then(function(stream) {
            console.log(stream);
        }, function(err) {
            console.log(err);
        });

        console.log(peers);

        //this.peerService.getConnect(peers[0]);
    }

    getRoomId(): string {
        return this.peerService.getRoomId();
    }

}