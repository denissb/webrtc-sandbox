export class MediaStream {
	url: string;
	hasVideo: boolean;

	constructor(url: string, hasVideo: boolean) { 
		this.url = url;
		this.hasVideo = hasVideo;
	}
}