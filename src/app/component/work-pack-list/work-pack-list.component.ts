import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Routes, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'
import { ConfigurationService } from '../../service/configuration.service';
import { WorkPack } from '../../model/work-pack'

@Component({
  selector: 'app-work-pack-list',
  templateUrl: './work-pack-list.component.html',
  styleUrls: ['./work-pack-list.component.css']
})
export class WorkPackListComponent implements OnInit {
  @Output() onSelected: EventEmitter<WorkPack>;

  private _workPacks: Array<WorkPack>
  @Input() set workPacks(list: Array<WorkPack>) {
    this._workPacks = list;
  }
  get workPacks(): Array<WorkPack> {
    return this._workPacks;
  }

  private _selectedPack: WorkPack;
  @Input() set selectedPack(item: WorkPack) {
    // console.log('WorkPackListComponent.set selectedPack: ' + JSON.stringify(item.Title));
    this._selectedPack = item;
  }
  get selectedPack(): WorkPack {
    return this._selectedPack;
  }

  constructor(public dialog: MatDialog,
    private router: Router, 
    private config: ConfigurationService) {
    this.onSelected = new EventEmitter();
  }

  ngOnInit() {
  }

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  OnClick(selected: WorkPack) {
    if (this.selectedPack == undefined) {
      this.selectedPack = selected;
      return;
    }

    if (this.selectedPack._id == selected._id) {
      this.config.setStatusFilter('');
      this.router.navigate(['/list']);
    } else {
      this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: false,
      });

      this.confirmDialogRef.componentInstance.confirmMessage = "Do you want to switch work packs?"
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.config.setStatusFilter('all');
          this.onSelected.emit(selected);
        }
        this.confirmDialogRef = null;
      });
    }
  }

}