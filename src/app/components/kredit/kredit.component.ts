import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { KreditService } from '../../services/kredit.service';
import { Kredit } from '../../models/kredit';
import { MatDialog, MatTableDataSource, MatTab, MatPaginator, MatSort } from '@angular/material';
import { KreditDialogComponent } from '../dialogs/kredit-dialog/kredit-dialog.component';

@Component({
  selector: 'app-kredit',
  templateUrl: './kredit.component.html',
  styleUrls: ['./kredit.component.css']
})
export class KreditComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  exampleDatabase: KreditService;
  dataSource: MatTableDataSource<Kredit>;


  constructor(public httpClient: HttpClient, 
              public kreditService: KreditService, 
              public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
     this.kreditService.getAllKredit().subscribe(data => {
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
    const dialogRef = this.dialog.open(KreditDialogComponent, {
      data: { id: id, naziv: naziv, opis: opis, oznaka: oznaka }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

}
