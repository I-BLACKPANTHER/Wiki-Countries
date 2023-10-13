import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  countryName: string = '';
  countryDetails: any;
  borderCountries: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.countryName = params['name'];
      this.fetchCountryDetails(this.countryName);
    });
  }

  fetchCountryDetails(name: string) {
    this.countryService.getCountriesByName(name).subscribe((data) => {
      this.countryDetails = data[0];
      this.borderCountries = data[0].borders;
    });
  }
}
