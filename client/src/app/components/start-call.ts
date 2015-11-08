import {Component, View} from 'angular2/angular2'
import {ConnectService} from '../services/connect'
import {APIService} from '../services/api'

@Component({
    selector: 'start-call',
    template: `
        <div>
            <button #status (click)='call(status)'>Call</button>
        </div>
        `
})
export class StartCallComponent {
    apiService: APIService;
    connectService: ConnectService;

    constructor(connectService: ConnectService, apiService: APIService) {
        this.connectService = connectService;
        this.apiService = apiService;
    }

    call(status) {
        this.apiService.getPeers(this.connectService.getRoomId())
            .then(
            r => {
                return r.json().then(data => {
                    this.connectService.start(data.peers);
                    status.hidden = true;
                }, err => {
                    alert('Sorry, something went wrong :/');
                    status.hidden = false;
                })
            },
            err => {
                alert('Sorry, an error occured while retreving the peer list!')
            }
            );
    }
}