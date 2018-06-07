import { Component, OnInit, Inject } from '@angular/core';
import { KreditService } from '../../../services/kredit.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KreditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public kreditService: KreditService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.id = -1;
    this.kreditService.addKredit(this.data);
    this.snackBar.open('Uspešno ste dodali kredit: ' + this.data.naziv, 'U redu', {duration: 2500});
  }

  public update(): void {
    this.kreditService.updateKredit(this.data);
    this.snackBar.open('Uspešno ste modifikovali kredit: ' + this.data.id, 'U redu', {duration: 2500});
  }

  public delete(): void {
    this.kreditService.deleteKredit(this.data.id);
    this.snackBar.open('Uspešno ste obrisali kredit: ' + this.data.id, 'U redu', {duration: 2500});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', {duration: 1000});
  }

}

