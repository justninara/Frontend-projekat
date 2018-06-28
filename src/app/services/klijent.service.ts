import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Klijent } from '../models/klijent';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class KlijentService {
    klijenti: Klijent[];
     private readonly API_URL = 'http://localhost:8083/klijent/';
    //private readonly API_URL = 'http://localhost:8080/backend/klijent/';

    dataChange: BehaviorSubject<Klijent[]> = new BehaviorSubject<Klijent[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Klijent[] {
        return this.dataChange.value;
    }

    public getAllKlijent(): Observable<Klijent[]> {
        this.httpClient.get<Klijent[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.klijenti = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addKlijent(klijent: Klijent): void {
      this.httpClient.post(this.API_URL, klijent).subscribe(data => {

      });
    }

    public updateKlijent(klijent: Klijent): void {
      this.httpClient.put(this.API_URL, klijent).subscribe(data => {

      });
    }

    public deleteKlijent(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe(data => {

      });
    }
}