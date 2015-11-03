import {Component, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {Budd} from './models/budd'
import {PeerService} from './services/peer'
import {NavigatorService} from './services/navigator'
import {StartCallComponent} from './components/start-call'

var BUDDS: Budd[] = [
	{ "connectId": "11", "name": "Mr. Nice" },
	{ "connectId": "12", "name": "Narco" },
	{ "connectId": "13", "name": "Bombasto" },
	{ "connectId": "14", "name": "Celeritas" },
	{ "connectId": "15", "name": "Magneta" },
	{ "connectId": "16", "name": "RubberMan" },
	{ "connectId": "17", "name": "Dynama" },
	{ "connectId": "18", "name": "Dr IQ" },
	{ "connectId": "19", "name": "Magma" },
	{ "connectId": "20", "name": "Tornado" }
];

@Component({
    selector: 'web-rtc-app',
    templateUrl: '/src/app/templates/peer-info.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, StartCallComponent],
})
class WebRTCAppComponent {
    public peer: Object;

	constructor(peerService: PeerService, navigatorService: NavigatorService) {
        this.peer = peerService.getPeer();
        navigatorService.getUserMedia().then(function(stream) {
            console.log(stream);
        }, function(err) {
            console.log(err);
        });
    }

	public title = 'WebRTC app';
    public peers = BUDDS;

	onSelect(budd: Budd) { 
		console.log(budd);
	}
}

bootstrap(WebRTCAppComponent, [PeerService, NavigatorService]);