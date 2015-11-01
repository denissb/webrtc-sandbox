var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var Peer = (function () {
    function Peer() {
    }
    return Peer;
})();
var PEERS = [
    { "connectId": "11", "name": "Mr. Nice" },
    { "connectId": "12", "name": "Narco" },
    { "connectId": "13", "name": "Bombasto" },
    { "connectId": "14", "name": "Celeritas" },
    { "connectId": "15", "name": "Magneta" },
    { "connectId": "16", "name": "RubberMan" },
    { "connectId": "17", "name": "Dynama" },
    { "connectId": "18", "name": "Dr IQ" },
    { "connectId": "19", "name": "Magma" },
    { "connectId": "20", "name": "Tornado" }
];
var WebRTCAppComponent = (function () {
    function WebRTCAppComponent() {
        this.title = 'WebRTC app';
        this.peers = PEERS;
    }
    WebRTCAppComponent.prototype.onSelect = function (peer) {
        console.log(peer.connectId);
    };
    WebRTCAppComponent = __decorate([
        angular2_1.Component({
            selector: 'web-rtc-app',
            templateUrl: '/src/app/templates/peer-info.html',
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [])
    ], WebRTCAppComponent);
    return WebRTCAppComponent;
})();
angular2_1.bootstrap(WebRTCAppComponent);
//# sourceMappingURL=app.js.map