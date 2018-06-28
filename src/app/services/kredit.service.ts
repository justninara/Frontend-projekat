import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Kredit } from '../models/kredit';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Identifiers } from '@angular/compiler';

@Injectable()
export class KreditService {
    krediti: Kredit[];
    private readonly API_URL = 'http://localhost:8083/kredit/';
    // private readonly API_URL = 'http://localhost:8080/backend/kredit/';

    dataChange: BehaviorSubject<Kredit[]> = new BehaviorSubject<Kredit[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Kredit[] {
        return this.dataChange.value;
    }

    public getAllKredit(): Observable<Kredit[]> {
        this.httpClient.get<Kredit[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.krediti = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addKredit(kredit: Kredit): void {
      this.httpClient.post(this.API_URL, kredit).subscribe(data => {

      });
    }

    public updateKredit(kredit: Kredit): void {
      this.httpClient.put(this.API_URL, kredit).subscribe(data => {

      });
    }

    public deleteKredit(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe(data => {

      });
    }
}
