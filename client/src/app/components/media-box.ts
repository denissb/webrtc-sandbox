import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgZone} from 'angular2/angular2'
import {ConnectService} from '../services/connect'
import {NavigatorService} from '../services/navigator'
import {MediaStream} from '../models/media-stream'

@Component({
    selector: 'media-box',
    properties: ['messages'],
    template: `
        <div>
            <div *ng-for="#stream of streams">
                <video [model]="video" src="{{stream.url}}">
                </video>
            </div>
        </div>
        `,
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES
    ]
})
export class MediaBoxComponent {
    connectService: ConnectService;
    navigatorService: NavigatorService;
    streams: Array<MediaStream> = [];
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
        let mediaStream: MediaStream = new MediaStream(callURL, true);

        console.log(mediaStream);
        this.zone.run(() => {
            this.streams.push(mediaStream);
        });
    }

}