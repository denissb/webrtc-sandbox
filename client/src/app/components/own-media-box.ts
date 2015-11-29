import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, NgZone} from 'angular2/angular2'
import {ConnectService} from '../services/connect'
import {NavigatorService} from '../services/navigator'
import {MediaStream} from '../models/media-stream'
import {MediaItemComponent} from './media-item'

@Component({
    selector: 'own-media-box',
    styleUrls: ['dist/css/components/own-media-box.css'],
    template: `
        <div class="own-media-box" *ng-if="mediaStream">
            <h3>Preview:</h3>
            <media-item [media]="mediaStream"></media-item>
        </div>    
        `,
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        MediaItemComponent
    ]
})
export class OwnMediaBoxComponent {
    private connectService: ConnectService;
    private navigatorService: NavigatorService;
    private mediaStream: MediaStream;
    private zone: NgZone;

    constructor(connectService: ConnectService, navigatorService: NavigatorService, zone: NgZone) {
        this.navigatorService = navigatorService;
        this.zone = zone;
        this.connectService = connectService;

        this.connectService.getOwnMediaStream().subscribe(stream => {
            this.addMediaStream(stream);
        });
    }

    private addMediaStream(stream) {
        let callURL = this.navigatorService.createObjectURL(stream);
        this.mediaStream = new MediaStream(callURL, true, stream);
    }
}