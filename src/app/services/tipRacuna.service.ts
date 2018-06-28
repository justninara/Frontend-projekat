import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TipRacuna } from '../models/tipRacuna';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipRacunaService {
    tipoviRacuna: TipRacuna[];
    private readonly API_URL = 'http://localhost:8083/tipRacuna/';
    // private readonly API_URL = 'http://localhost:8080/backend/tipRacuna/';

    dataChange: BehaviorSubject<TipRacuna[]> = new BehaviorSubject<TipRacuna[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): TipRacuna[] {
      return this.dataChange.value;
  }

    public getAllTipRacuna(): Observable<TipRacuna[]> {
        this.httpClient.get<TipRacuna[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
          this.tipoviRacuna = data;
        },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
        return this.dataChange.asObservable();
      }

      
      public addTipRacuna(tipRacuna: TipRacuna): void {
        this.httpClient.post(this.API_URL, tipRacuna).subscribe(data => {
  
        });
      }
  
      public updateTipRacuna(tipRacuna: TipRacuna): void {
        this.httpClient.put(this.API_URL, tipRacuna).subscribe(data => {
  
        });
      }
  
      public deleteTipRacuna(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
  
        });
      }
  }

    
