import {Component, View, CORE_DIRECTIVES, ElementRef} from 'angular2/angular2'
import {MediaStream} from '../models/media-stream'

@Component({
    selector: 'media-item',
    properties: ['media'],
    template: `
        <video src="{{media.url}}"></video>
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

}