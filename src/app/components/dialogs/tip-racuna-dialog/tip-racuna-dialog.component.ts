import { Component, OnInit, Inject } from '@angular/core';
import { TipRacunaService } from '../../../services/tipRacuna.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Racun } from '../../../models/racun';
import { TipRacuna } from '../../../models/tipRacuna';
import { RacunService } from '../../../services/racun.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  racuni: Racun[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: TipRacuna,
               public tipRacunaService: TipRacunaService,
               public racunService: RacunService
  ) { }
 
 
  ngOnInit() {
    this.racunService.getAllRacun().subscribe(racuni =>
      this.racuni = racuni
    );
  }
 
  public add(): void {
    this.data.id = -1;
    this.tipRacunaService.addTipRacuna(this.data);
    this.snackBar.open('Uspešno dodat tip racuna', 'U redu', { duration: 2500 });
  }
 
  public update(): void {
    this.tipRacunaService.updateTipRacuna(this.data);
    this.snackBar.open('Uspešno modifikovan tip racuna', 'U redu', { duration: 2500 });
  }
 
  public delete(): void {
    this.tipRacunaService.deleteTipRacuna(this.data.id);
    this.snackBar.open('Uspešno obrisan tip racuna', 'U redu', { duration: 2000 });
  }
 
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 1000 });
  }
 
  compareTo(a, b) {
    return a.id === b.id;
  }
 }

  

