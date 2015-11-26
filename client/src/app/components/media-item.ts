import {Component, View, CORE_DIRECTIVES, NgClass, ElementRef} from 'angular2/angular2'
import {MediaStream} from '../models/media-stream'

@Component({
    selector: 'media-item',
    properties: ['media'],
    styleUrls: ['dist/css/components/media-item.css'],
    template: `
        <div [ng-class]="classMap"></div>
        <video controls 
		class="media-item" src={{media.url}} [hidden]='visible'>
        </video>
        `,
    directives: [
        CORE_DIRECTIVES,
        NgClass
    ]
})
export class MediaItemComponent {
    videoElement: any;
    media: MediaStream;
    hidden: boolean;
    classMap: Object;

    constructor(element: ElementRef) {
        this.videoElement = element.nativeElement.children[1];
        this.classMap = {
            'no-video': false, 
            'no-audio': false
        };
        this.hidden = true;
    }

    onInit() {
        // Binding to video events - maybe this should be encapsulated?
        this.videoElement.addEventListener('canplay', (e) => {
            this.checkState();
            this.videoElement.play();
            this.hidden = false;
        });

        //Setting color
        this.videoElement.style.background = this.media.userId;

        // HACK: There is a problem with the video pausing after more than 1 peer is connected
        function oneTimeAutoPlay(event) {
            if (event.currentTarget.paused) {
                event.currentTarget.play();
                event.currentTarget.removeEventListener('timeupdate', oneTimeAutoPlay);
            }
        }    

        this.videoElement.addEventListener('timeupdate', oneTimeAutoPlay);
    }

    private checkState() {
        if (this.media.stream.getVideoTracks().length === 0) {
            this.classMap['no-video']  = true;
        }

        if (this.media.stream.getAudioTracks().length === 0) {
            this.classMap['no-audio'] = true;
        }
    }
}