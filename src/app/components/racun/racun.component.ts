import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { RacunService } from '../../services/racun.service';
import { Racun } from '../../models/racun';
import { Klijent } from '../../models/klijent';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';
import { TipRacuna } from '../../models/tipRacuna';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'klijent', 'tipRacuna', 'actions'];
  dataSource: MatTableDataSource<Racun>;

  @Input() selektovaniKlijent: Klijent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public racunService: RacunService, public dialog: MatDialog) { }

 

  ngOnInit() {
    //this.dataSource = this.racunService.getAllRacun();
  }

  ngOnChanges() {
    if (this.selektovaniKlijent.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.racunService.getRacuniZaKlijent(this.selektovaniKlijent.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<Racun>(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };


      // sortiranje po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'tipRacuna': return data.tipRacuna.naziv.toLocaleLowerCase();
          default: return data[property].toLocaleLowerCase();
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

  public openDialog(flag: number, id: number, naziv: string, opis: string, oznaka: string, klijent: Klijent, tipRacuna: TipRacuna) {
    const dialogRef = this.dialog.open(RacunDialogComponent, {
      data: { id: id, naziv: naziv, opis: opis, oznaka: oznaka, klijent: klijent, tipRacuna: tipRacuna }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.klijent = this.selektovaniKlijent;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });

  }
  


 

}
