import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatPaginatorModule
} from '@angular/material';

import { KlijentComponent } from './components/klijent/klijent.component';
import { KreditComponent } from './components/kredit/kredit.component';
import { RacunComponent } from './components/racun/racun.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { TipRacunaComponent } from './components/tip-racuna/tip-racuna.component';
import { KlijentService } from './services/klijent.service';
import { KreditService } from './services/kredit.service';
import { RacunService } from './services/racun.service';
import { TipRacunaService } from './services/tipRacuna.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { KlijentDialogComponent } from './components/dialogs/klijent-dialog/klijent-dialog.component';
import { KreditDialogComponent } from './components/dialogs/kredit-dialog/kredit-dialog.component';
import { RacunDialogComponent } from './components/dialogs/racun-dialog/racun-dialog.component';
import { TipRacunaDialogComponent } from './components/dialogs/tip-racuna-dialog/tip-racuna-dialog.component';

const Routes = [
  { path: 'klijent', component: KlijentComponent },
  { path: 'kredit', component: KreditComponent },
  { path: 'racun', component: RacunComponent },
  { path: 'tipRacuna', component: TipRacunaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    KlijentComponent,
    KreditComponent,
    RacunComponent,
    AboutComponent,
    AuthorComponent,
    HomeComponent,
    TipRacunaComponent,
    KlijentDialogComponent,
    KreditDialogComponent,
    RacunDialogComponent,
    TipRacunaDialogComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
    MatGridListModule, MatExpansionModule, MatSortModule,
    MatTableModule,
    MatToolbarModule, MatSelectModule, MatOptionModule,
    MatSnackBarModule, MatDialogModule, MatInputModule,
    MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, 
    MatPaginatorModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  entryComponents: [KlijentDialogComponent, KreditDialogComponent, RacunDialogComponent, TipRacunaDialogComponent ],
  providers: [KlijentService, KreditService, RacunService, TipRacunaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
