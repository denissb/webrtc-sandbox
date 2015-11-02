import {Component, View, bootstrap} from 'angular2/angular2'

@Component({
    selector: 'start-call',
    template:`
        <div>Hello my name is . <button (click)='call()'>Call</button></div>
        `
})
export class StartCallComponent {
    private name: string = 'Fred';

    call() {
        console.log('Calling', this.name)
    }
}