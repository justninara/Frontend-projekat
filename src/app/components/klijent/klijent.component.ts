import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { KlijentService } from '../../services/klijent.service';
import { Klijent } from '../../models/klijent';
import { Kredit } from '../../models/kredit';
import { MatDialog, MatTableDataSource, MatTab, MatPaginator, MatSort } from '@angular/material';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  selektovaniKlijent: Klijent;

  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild (MatSort) sort: MatSort;

  constructor(
              public klijentService: KlijentService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.klijentService.getAllKlijent().subscribe(data => {
      this.dataSource = new MatTableDataSource<Klijent>(data);

        // pretraga po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // sortiranje po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'kredit': return data.kredit.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog (flag: number, id: number,  ime: string, prezime: string, kredit: Kredit ) {
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data: {id: id, ime: ime, prezime: prezime, kredit: kredit}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public selectRow(row) {
    this.selektovaniKlijent = row;
  }
}
