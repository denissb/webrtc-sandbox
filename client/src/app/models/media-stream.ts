export class MediaStream {
	url: string;
	hasVideo: boolean;
	stream: any;

	constructor(url: string, hasVideo: boolean, stream: any) { 
		this.url = url;
		this.hasVideo = hasVideo;
		this.stream = stream;
	}
}