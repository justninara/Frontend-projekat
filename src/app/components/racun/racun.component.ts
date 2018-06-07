import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { RacunService } from '../../services/racun.service';
import { Racun } from '../../models/racun';
import { Klijent } from '../../models/klijent';
import { MatDialog, MatTableDataSource, MatTab, MatPaginator, MatSort } from '@angular/material';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'klijent', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  selektovaniRacun: Racun;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public racunService: RacunService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.racunService.getAllRacun().subscribe(data => {
      this.dataSource = new MatTableDataSource<Racun>(data);

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id' : return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      // pretraga po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'klijent' ? currentTerm + data.klijent.ime : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
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

  public openDialog(flag: number, id: number, naziv: string, opis: string, oznaka: string, klijent: Klijent) {
    const dialogRef = this.dialog.open(RacunDialogComponent, {
      data: { id: id, naziv: naziv, opis: opis, oznaka: oznaka, klijent: klijent }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });

  }
  public selectRow(row) {
    this.selektovaniRacun = row;
  }


 

}
