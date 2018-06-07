import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Racun } from '../models/racun';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RacunService {
    racuni: Racun[];
    private readonly API_URL = 'http://localhost:8083/racun/';
    // private readonly API_URL = 'http://localhost:8080/backend/racun/';

    dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Racun[] {
        return this.dataChange.value;
    }

    public getAllRacun(): Observable<Racun[]> {
        this.httpClient.get<Racun[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.racuni = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addRacun(racun: Racun): void {
      this.httpClient.post(this.API_URL, racun).subscribe(data => {

      });
    }

    public updateRacun(racun: Racun): void {
      this.httpClient.put(this.API_URL, racun).subscribe(data => {

      });
    }

    public deleteRacun(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe(data => {

      });
    }
}
