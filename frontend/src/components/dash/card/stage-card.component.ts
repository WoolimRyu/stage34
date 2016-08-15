import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Stage } from '../../../models/stage';

import { TimeAgoPipe } from 'angular2-moment';

@Component({
    selector: 'stage-card',
    templateUrl: 'stage-card.component.html',
    styleUrls: ['stage-card.component.css'],
    pipes: [TimeAgoPipe]
})
export class StageCardComponent implements OnInit {
    @Input() stage: Stage;
    @Input() forNew: boolean = false;

    @Output() showInfo = new EventEmitter();
    @Output() toggleStatus = new EventEmitter();
    @Output() addNew = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    statusIconClass() {
        return {
            'fa-stop': this.stage.status == 'running',
            'fa-play': this.stage.status =='paused'
        }
    }

    onInfoClicked() {
        this.showInfo.emit({value: this.stage});
    }

    onStatusClicked() {
        this.toggleStatus.emit({value: this.stage});
    }

    onNewClicked() {
        this.addNew.emit({});
    }
}