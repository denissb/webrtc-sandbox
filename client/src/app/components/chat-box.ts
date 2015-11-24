import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgZone} from 'angular2/angular2'
import {ConnectService} from '../services/connect'
import {Message} from '../models/message'

@Component({
    selector: 'chat-box',
    templateUrl: './src/app/templates/chat-box.html',
    styleUrls: ['dist/css/components/chat-box.css'],
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ]    
})
export class ChatBoxComponent {
    connectService: ConnectService;
    connections: Array<any> = [];
    messages: Array<Message> = [];
    zone: NgZone;

    constructor(connectService: ConnectService, zone: NgZone) {
        this.zone = zone;
        this.connectService = connectService;

        this.connectService.getDataStream().subscribe(conn => {
            // Running it in a zone makes the UI update faster
            this.zone.run(() => {
                this.connections.push(conn);
            });

            conn.on('data', data => {
                let author = conn.peer.slice(16);
                this.addMessage(author, data);
            })
        });
    }

    addMessage(author, msg) {
        let message = new Message(author, msg);
        this.zone.run(() => {
            this.messages.push(message);
        });
    }

    sendMessage(msgInput) {
        let msg = msgInput.value;
        msgInput.value = '';
        this.addMessage('222', msg);
        
        this.connections.forEach(conn => {
            conn.send(msg);
        });
    }

}