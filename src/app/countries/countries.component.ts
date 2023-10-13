import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  selectedRegion: string = '';
  filterText: string = '';
  allCountries: any[] = [];
  filteredCountries: any[] = [];
  pageSize = 20;
  pageIndex = 0;
  pageEvent!: PageEvent;

  constructor(private countryService: CountriesService) {}

  ngOnInit() {
    this.getCountriesData();
  }

  filterCountries() {
    this.filteredCountries = this.allCountries.filter(
      (country) =>
        country.name.common
          .toLowerCase()
          .includes(this.filterText.toLowerCase()) &&
        (this.selectedRegion === '' ||
          country.region.toLowerCase() === this.selectedRegion.toLowerCase())
    );
  }

  getCountriesData() {
    this.countryService.getCountries().subscribe((data) => {
      this.allCountries = data;
      this.filteredCountries = data;
    });
  }

  handlePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
