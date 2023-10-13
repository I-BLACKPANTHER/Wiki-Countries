import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CountriesService } from './countries.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    CountriesComponent,
    CountryDetailsComponent,
    PageNotFoundComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    CountriesService,
    LoginService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
