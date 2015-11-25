export class MediaStream {
	url: string;
	hasVideo: boolean;
	stream: any;
    userId: string;

	constructor(url: string, hasVideo: boolean, stream: any) { 
		this.url = url;
		this.hasVideo = hasVideo;
		this.stream = stream;
        this.userId = `#${stream.peer.slice(16)}`;
	}
}