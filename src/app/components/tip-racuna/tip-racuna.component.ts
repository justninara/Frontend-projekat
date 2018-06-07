import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TipRacunaService } from '../../services/tipRacuna.service';
import { TipRacuna } from '../../models/tipRacuna';
import { MatDialog, MatTableDataSource, MatTab, MatPaginator, MatSort } from '@angular/material';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';
import { Racun } from '../../models/racun';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<TipRacuna>;


  constructor( 
              public tipRacunaService: TipRacunaService, 
              public dialog: MatDialog) { }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() selektovaniRacun: Racun;

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.selektovaniRacun.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.tipRacunaService.getTipoveZaRacun(this.selektovaniRacun.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<TipRacuna>(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id' : return data[property];
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

  public openDialog(flag: number, id: number, naziv: string, opis: string, oznaka: string,
    racun: Racun) {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {
      data: {
        i: id, id: id, naziv: naziv, opis: opis, oznaka: oznaka,
        racun: racun
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.racun = this.selektovaniRacun;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}