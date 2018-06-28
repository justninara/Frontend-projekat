import { Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TipRacunaService } from '../../services/tipRacuna.service';
import { TipRacuna } from '../../models/tipRacuna';
import { MatDialog, MatTableDataSource, MatTab, MatPaginator, MatSort } from '@angular/material';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';


@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  exampleDatabase: TipRacunaService;
  dataSource: MatTableDataSource<TipRacuna>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient,
              public tipRacunaService: TipRacunaService, 
              public dialog: MatDialog) { }


 

  ngOnInit() {
    this.loadData();
    
  }


  public loadData() {
    this.tipRacunaService.getAllTipRacuna().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
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

  public openDialog(flag: number, id: number, naziv: string, opis: string, oznaka: string) {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data: { id: id, naziv: naziv, opis: opis, oznaka: oznaka }});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}