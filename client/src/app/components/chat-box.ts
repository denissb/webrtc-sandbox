import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgZone} from 'angular2/angular2'
import {ConnectService} from '../services/connect'

@Component({
    selector: 'chat-box',
    templateUrl: './src/app/templates/chat-box.html',
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ]    
})
export class ChatBoxComponent {
    connectService: ConnectService;
    connections: Array<any> = [];
    messages: Array<string> = [];
    zone: NgZone;

    constructor(connectService: ConnectService, zone: NgZone) {
        this.zone = zone;
        this.connectService = connectService;

        this.connectService.getDataStream().subscribe(conn => {
            this.connections.push(conn);

            conn.on('data', data => {
                let author = conn.peer.slice(16);
                this.addMessage(author, data);
            })
        });
    }

    addMessage(author, msg) {
        this.zone.run(() => {
            this.messages.push(`${author}: ${msg}`);
        });
    }

    sendMessage(msgInput) {
        let msg = msgInput.value;
        msgInput.value = '';
        this.addMessage('You', msg);
        
        this.connections.forEach(conn => {
            conn.send(msg);
        });
    }

}