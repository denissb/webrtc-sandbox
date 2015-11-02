interface PeerConfig {
    host: string,
    port: number,
    path: string
}

// This is crap
export var config: PeerConfig = {
    host: 'localhost',
    port: 9000,
    path: '/api'
}
