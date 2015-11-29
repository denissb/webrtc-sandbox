export class PeerConfig {
    static host = '/';
    static port = 9000;
    static path = '/connect';
    static iceServers = [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'stun: stun2.l.google.com:19302' },
        { 
            url: 'turn:homeo@turn.bistri.com:80', 
            credential: 'homeo' 
        },
        { 
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        }
    ];
};
