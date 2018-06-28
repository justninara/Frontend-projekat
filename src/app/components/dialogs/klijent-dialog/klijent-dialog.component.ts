import { Component, OnInit, Inject } from '@angular/core';
import { Klijent } from '../../../models/klijent';
import { KlijentService } from '../../../services/klijent.service';
import { Kredit } from '../../../models/kredit';
import { KreditService } from '../../../services/kredit.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {
  krediti: Kredit[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KlijentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Klijent,
    public klijentService: KlijentService,
    public kreditService: KreditService
  ) { }

  ngOnInit() {
    this.kreditService.getAllKredit().subscribe(krediti =>
    this.krediti = krediti);
  }

  public compareTo(a, b) {
    return a.id === b.id;
  }

  public onChange(kredit) {
    this.data.kredit = kredit;
  }

  public add(): void {
    this.data.id = -1;
    this.klijentService.addKlijent(this.data);
    this.snackBar.open('Uspešno ste dodali klijenta' + this.data, 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.klijentService.updateKlijent(this.data);
    this.snackBar.open('Uspešno ste modifikovali klijenta' + this.data.id, 'U redu',
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.klijentService.deleteKlijent(this.data.id);
    this.snackBar.open('Uspešno ste obrisali klijenta' + this.data.id, 'U redu',
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



