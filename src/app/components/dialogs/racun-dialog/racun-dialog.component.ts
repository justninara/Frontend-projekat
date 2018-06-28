import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { RacunService } from '../../../services/racun.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipRacuna } from '../../../models/tipRacuna';
import { TipRacunaService } from '../../../services/tipRacuna.service';
import { Racun } from '../../../models/racun';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {
  tipoviRacuna: TipRacuna[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService,
              public tipRacunaService: TipRacunaService
    
  ) { }

  ngOnInit() {
    this.tipRacunaService.getAllTipRacuna().subscribe(tipoviRacuna =>
      this.tipoviRacuna = tipoviRacuna
    );
  }

  public add(): void {
    this.data.id = -1;
    this.racunService.addRacun(this.data);
    this.snackBar.open('Uspešno ste dodali racun: ', 'U redu', {duration: 2500});
  }

  public update(): void {
    this.racunService.updateRacun(this.data);
    this.snackBar.open('Uspešno ste modifikovali racun', 'U redu',
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id);
    this.snackBar.open('Uspešno ste obrisali racun', 'U redu',
      {
        duration: 2500
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu',
    {
      duration: 1000
    });
  }
  compareTo(a, b) {
    return a.id === b.id;
  }

}



