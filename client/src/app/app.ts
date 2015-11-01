import {Component, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

class Peer {
	connectId: string;
	name: string;
}

var PEERS: Peer[] = [
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
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
})
class WebRTCAppComponent {
	public title = 'WebRTC app';
	public ownPeer: Peer; 

	public peers = PEERS;

	onSelect(peer: Peer) { 
		console.log(peer.connectId); 
	}
}

bootstrap(WebRTCAppComponent);