import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Racun } from '../models/racun';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RacunService {
    racunService: RacunService;
    private readonly API_URL = 'http://localhost:8083/racun/';
    private readonly API_URL_BYID = 'http://localhost:8083/racuniZaKlijent/';
    // private readonly API_URL = 'http://localhost:8080/backend/racun/';
    dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }


    public getAllRacun(): Observable<Racun[]> {
        this.httpClient.get<Racun[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public getRacuniZaKlijent(idKlijenta): Observable<Racun[]> {
        this.httpClient.get<Racun[]>(this.API_URL_BYID + idKlijenta).subscribe(data => {
          this.dataChange.next(data);
        },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
        return this.dataChange.asObservable();
    }

    public addRacun(racun: Racun): void {
     this.httpClient.post(this.API_URL, racun).subscribe();
   }
     
   public updateRacun(racun: Racun): void {
      this.httpClient.put(this.API_URL, racun).subscribe();
     }
     
  public deleteRacun(id: number): void {
       this.httpClient.delete(this.API_URL + id).subscribe();
    }
}
