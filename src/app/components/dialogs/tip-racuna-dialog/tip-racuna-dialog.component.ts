import { Component, OnInit, Inject } from '@angular/core';
import { TipRacunaService } from '../../../services/tipRacuna.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {
  public flag: number;

  constructor(public snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public tipRacunaService: TipRacunaService ) { }
 
 
  ngOnInit() {

  }
 
  public add(): void {
    this.data.id = -1;
    this.tipRacunaService.addTipRacuna(this.data);
    this.snackBar.open('Uspešno dodat tip racuna' + this.data.naziv, 'U redu', { duration: 2500 });
  }
 
  public update(): void {
    this.tipRacunaService.updateTipRacuna(this.data);
    this.snackBar.open('Uspešno modifikovan tip racuna' + this.data.id, 'U redu', { duration: 2500 });
  }
 
  public delete(): void {
    this.tipRacunaService.deleteTipRacuna(this.data.id);
    this.snackBar.open('Uspešno obrisan tip racuna' + this.data.id, 'U redu', { duration: 2000 });
  }
 
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 1000 });
  }
 
 
 }

  

