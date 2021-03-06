import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Stage } from '../../../models/stage';

@Component({
    selector: 'stage-card',
    templateUrl: 'stage-card.component.html',
    styleUrls: ['stage-card.component.scss']
})
export class StageCardComponent implements OnInit {
    @Input() stage: Stage;
    @Input() forNew: boolean = false;

    @Output() toggleStatus = new EventEmitter();
    @Output() showInfo = new EventEmitter();
    @Output() addNew = new EventEmitter();
    @Output() trash = new EventEmitter();
    @Output() refresh = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    private trashIconClass() {
        return {
            'fa-spinner fa-pulse fa-fw': ['deleting'].includes(this.stage.status),
            'fa-trash': this.stage.status === 'paused'
        }
    }

    private statusIconClass() {
        return {
            'fa-spinner fa-pulse fa-fw': ['creating', 'changing'].includes(this.stage.status),
            'fa-stop': this.stage.status === 'running',
            'fa-play': this.stage.status ==='paused'
        }
    }

    private canTrash() {
        return this.stage &&  ['deleting', 'paused'].includes(this.stage.status);
    }

    private canRefresh() {
        return this.stage && this.stage.status === 'running';
    }

    private onInfoClicked() {
        this.showInfo.emit({value: this.stage});
    }

    private onStatusClicked() {
        if (['running', 'paused'].includes(this.stage.status)) {
            this.toggleStatus.emit({value: this.stage});
        }
    }

    private onNewClicked() {
        this.addNew.emit({});
    }

    private onTrashClicked() {
        this.trash.emit({value: this.stage});
    }

    private onRefreshClicked() {
        this.refresh.emit({value: this.stage});
    }
}