import {Component, View, bootstrap} from 'angular2/angular2'
import {PeerService} from '../services/peer'
import {APIService} from '../services/api'

@Component({
    selector: 'start-call',
    template:`
        <div>Hello my name is . <button (click)='call()'>Call</button></div>
        `
})
export class StartCallComponent {
    roomId: string;
    apiService: APIService;
    peerService: PeerService;
    peer: Object;

    constructor(peerService: PeerService, apiService: APIService) {
        this.peerService = peerService;
        this.roomId = peerService.getRoomId();
        this.apiService = apiService;
    }

    call() {
        this.apiService.getPeers(this.roomId)
            .then(
            r => {
                return r.json().then(data => {
                    console.log(data.peers); // Now something needs to be done with the peer list?
                    this.peer = this.peerService.getPeer();   
                })
            },
            err => {
                alert('Sorry, an error occured for retreving the peer list!')
            }
            );
    }
}