import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { CountriesInterface } from '../countries-interface';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavHeaderComponent } from '../nav-header/nav-header.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit, OnChanges {
  
 message: boolean;
  fasearch = faSearch; 
  continentList: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  selectedContinent: string = this.continentList[0];
  errorMsg: string;
  _countryFilter: string;
  get countryFilter(): string {
    return this._countryFilter;
  }
  _countryCurFilter: string;
  get countryCurFilter(): string {
    return this._countryCurFilter;
  }
  set countryFilter(value: string) {
    this._countryFilter = value;
    this.fcountries = this.countryFilter ? this.performFilter(this.countryFilter) : this.countries;
  }
  set countryCurFilter(value: string) {
    this._countryCurFilter = value;
    this.fcountries = this.countryCurFilter ? this.performCurFilter(this.countryCurFilter) : this.countries;
  }

  constructor(private countriesService: CountriesServiceService, 
    private route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  
  countries: CountriesInterface[];
  fcountries: CountriesInterface[] = [];
  ngOnInit() {
    this.countriesService.getCountries().subscribe(
      countries => {
        this.countries = countries;
        this.fcountries = this.countries;
      },
      error => this.errorMsg = <any>error
    );

  }

  performFilter(filterBy: string): CountriesInterface[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: CountriesInterface) =>
      country.name.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }
  performCurFilter(filterBy: string): any {
    filterBy = filterBy.toUpperCase();
    console.log(filterBy);
    return this.countries.filter(country =>{
      console.log(country.currencies[0].code);
      if(country.currencies[0].code !=null){
      return  country.currencies[0].code.toUpperCase().indexOf(filterBy) !== -1
      } 
    })
      
  }

  selectByContinent(event: any) {
    const targetContinent = event.target.value.toLowerCase();
    console.log(targetContinent);
    if (targetContinent == "all") {
      this.countriesService.getCountries().subscribe(
        countries => {
          this.countries = countries;
          this.fcountries = this.countries;
        },
        error => this.errorMsg = <any>error
      );
      return;
    }
    
    let continentName: string = this.route.snapshot.params[targetContinent];
    this.countriesService.getCountriesByContinent(targetContinent).subscribe(
      countries => {
        this.countries = countries;
        this.fcountries = this.countries;

      },
      error => this.errorMsg = <any>error
    )
  }

  


}
