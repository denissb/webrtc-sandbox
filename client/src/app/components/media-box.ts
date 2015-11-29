import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgZone} from 'angular2/angular2'
import {ConnectService} from '../services/connect'
import {NavigatorService} from '../services/navigator'
import {MediaStream} from '../models/media-stream'
import {MediaItemComponent} from './media-item'

@Component({
    selector: 'media-box',
    styleUrls: ['dist/css/components/media-box.css'],
    template: `
        <div class="media-box">
            <h2 *ng-if="isOpen && mediaStreams.length === 0">No peers connected</h2>
            <media-item *ng-for="#mediaStream of mediaStreams"
                [media]="mediaStream"></media-item>
        </div>    
        `,
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        MediaItemComponent
    ]
})
export class MediaBoxComponent {
    private connectService: ConnectService;
    private navigatorService: NavigatorService;
    private mediaStreams: Array<MediaStream> = [];
    private zone: NgZone;
    private ownId: string;
    private isOpen: boolean;

    constructor(connectService: ConnectService, navigatorService: NavigatorService, zone: NgZone) {
        this.navigatorService = navigatorService;
        this.zone = zone;
        this.connectService = connectService;

        this.connectService.getCallStream().subscribe(stream => {
            this.addMediaStream(stream);
        });

        this.connectService.getCloseStream().subscribe(stream => {
            this.removeMediaStream(stream);
        });

        this.connectService.getStatusStream().subscribe(id => {
            this.ownId = id;

            //HACK - otherwise the message with no peers flashes until we recive the first handshake
            setTimeout(() => {
                this.isOpen = true;
            }, 400);
        });
    }

    private addMediaStream(stream) {
        let callURL = this.navigatorService.createObjectURL(stream);
        let mediaStream: MediaStream = new MediaStream(callURL, true, stream);

        console.log(mediaStream);

        this.zone.run(() => {
            this.mediaStreams.push(mediaStream);
        });
    }

    // Removes a stream by reference
    private removeMediaStream(stream) {
        for (var i = 0; i < this.mediaStreams.length; i++) {
            if (this.mediaStreams[i].stream.id === stream.id) {
                this.zone.run(() => {
                    this.mediaStreams.splice(i, 1);
                });
                return true;
            }
        }

        return false;
    }
}