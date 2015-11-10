import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgZone} from 'angular2/angular2'
import {ConnectService} from '../services/connect'
import {NavigatorService} from '../services/navigator'
import {MediaStream} from '../models/media-stream'
import {MediaItemComponent} from './media-item'

@Component({
    selector: 'media-box',
    template: `
        <div *ng-for="#mediaStream of mediaStreams">
            <media-item [media]="mediaStream"></media-item>
        </div>
        `,
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        MediaItemComponent
    ]
})
export class MediaBoxComponent {
    connectService: ConnectService;
    navigatorService: NavigatorService;
    mediaStreams: Array<MediaStream> = [];
    zone: NgZone;

    constructor(connectService: ConnectService, navigatorService: NavigatorService, zone: NgZone) {
        this.navigatorService = navigatorService;
        this.zone = zone;
        this.connectService = connectService;

        this.connectService.getCallStream().subscribe(stream => {
            this.addMediaStream(stream);
        });
    }

    private addMediaStream(stream) {
        let callURL = this.navigatorService.createObjectURL(stream);
        let mediaStream: MediaStream = new MediaStream(callURL, true, stream);

        this.zone.run(() => {
            this.mediaStreams.push(mediaStream);
        });
    }

}