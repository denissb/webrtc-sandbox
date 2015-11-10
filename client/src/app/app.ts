import {Component, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ConnectService} from './services/connect'
import {PeerService} from './services/peer'
import {APIService} from './services/api'
import {NavigatorService} from './services/navigator'

// Components
import {StartCallComponent} from './components/start-call'
import {ChatBoxComponent} from './components/chat-box'
import {MediaBoxComponent} from './components/media-box'
import {MediaItemComponent} from './components/media-item'

@Component({
    selector: 'web-rtc-app',
    templateUrl: '/src/app/templates/web-rtc-app.html',
    directives: [
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        StartCallComponent,
        ChatBoxComponent,
        MediaBoxComponent,
        MediaItemComponent
        ]
})
class WebRTCAppComponent {
    public title = 'WebRTC app';

    constructor() { }
}

bootstrap(WebRTCAppComponent,
    [
        ConnectService,
        PeerService,
        NavigatorService,
        APIService
    ]);