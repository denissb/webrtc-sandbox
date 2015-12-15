import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser'
import {ConnectService} from './services/connect'
import {PeerService} from './services/peer'
import {APIService} from './services/api'
import {NavigatorService} from './services/navigator'

// Components
import {StartCallComponent} from './components/start-call'
import {ChatBoxComponent} from './components/chat-box'
import {MediaBoxComponent} from './components/media-box'
import {MediaItemComponent} from './components/media-item'
import {OwnMediaBoxComponent} from './components/own-media-box'

@Component({
    selector: 'web-rtc-app',
    templateUrl: '/src/app/templates/web-rtc-app.html',
    styleUrls: ['dist/css/components/web-rtc-app.css'],
    directives: [
        StartCallComponent,
        ChatBoxComponent,
        MediaBoxComponent,
        MediaItemComponent,
        OwnMediaBoxComponent
        ]
})
class WebRTCAppComponent {
    public title = 'WebRTC app';
    public status = 'pre-alpha';
    public initialised = false;

    constructor(connectService: ConnectService) {
        connectService.getStatusStream().subscribe(next => {
            this.initialised = true;
        })
    }    

    toggleSidebar(sidebar) {
        sidebar.classList.toggle('hidden');
    }
}

bootstrap(WebRTCAppComponent,
    [
        ConnectService,
        PeerService,
        NavigatorService,
        APIService
    ]);