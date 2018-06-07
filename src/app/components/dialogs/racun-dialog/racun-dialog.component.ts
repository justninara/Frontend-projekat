import { Component, OnInit, Inject } from '@angular/core';
import { Klijent } from '../../../models/klijent';
import { Racun } from '../../../models/racun';
import { RacunService } from '../../../services/racun.service';
import { KlijentService } from '../../../services/klijent.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {
  klijenti: Klijent[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    public racunService: RacunService,
    public klijentService: KlijentService
  ) { }

  ngOnInit() {
    this.klijentService.getAllKlijent().subscribe(klijenti =>
    this.klijenti = klijenti);
  }

  public compareTo(a, b) {
    return a.id === b.id;
  }

  public onChange(klijent) {
    this.data.klijent = klijent;
  }

  public add(): void {
    this.data.id = -1;
    this.racunService.addRacun(this.data);
    this.snackBar.open('Uspešno ste dodali racun', 'U redu',
      {
        duration: 2500
      });
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

}



