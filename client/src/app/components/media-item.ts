import {Component, View, CORE_DIRECTIVES, ElementRef} from 'angular2/angular2'
import {MediaStream} from '../models/media-stream'

@Component({
    selector: 'media-item',
    properties: ['media'],
    template: `
        <video loop autoplay="true" controls src={{media.url}}></video>
        `,
    directives: [
        CORE_DIRECTIVES
    ]
})
export class MediaItemComponent {
    videoElement: any;
    media: MediaStream;

    constructor(element: ElementRef) {
        this.videoElement = element.nativeElement.children[0];
    }

    onInit() {
        // Binding to video events - maybe this should be encapsulated?
        this.videoElement.addEventListener('canplay', (e) => {
            this.videoElement.play();
        });

        // HACK: There is a problem with the video pausing after more than 1 peer is connected
        function oneTimeAutoPlay(event) {
            if (event.currentTarget.paused) {
                event.currentTarget.play();
                event.currentTarget.removeEventListener('timeupdate', oneTimeAutoPlay);
            }
        }    

        this.videoElement.addEventListener('timeupdate', oneTimeAutoPlay);
    }
}