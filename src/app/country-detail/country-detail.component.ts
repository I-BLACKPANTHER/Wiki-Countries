import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../countries-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  message: boolean;
  count: number = 0;
  population: number;
  capital: string;
  flag: string;
  region: string;
  subregion: string;
  nativeName: string;
  tld: string;

  alpha3Code: string;
  borders: string[];
  borderingCountries: any = [];

  currencies: string[];
  countryCurrency: string[];
  resultCurrency: any = [];

  languages: string[];
  countryLang: string[];
  resultLang: any = [];

  name = this.route.snapshot.paramMap.get('name');


  constructor(private countryService: CountriesServiceService,
    private route: ActivatedRoute, private router: Router) { }

  // @HostListener('click', ['event'])


  ngOnInit() {



    this.countryService.getCountry(this.name, (resultCountry) => {
      this.population = resultCountry.population;
      this.capital = resultCountry.capital;
      this.flag = resultCountry.flag;
      this.region = resultCountry.region;
      this.subregion = resultCountry.subregion;
      this.tld = resultCountry.topLevelDomain;
      this.currencies = resultCountry.currencies;
      this.languages = resultCountry.languages;
      this.alpha3Code = resultCountry.alpha3Code;
      this.nativeName = resultCountry.nativeName;
      this.borders = resultCountry.borders;


      //curency used       
      this.countryCurrency = { ...this.currencies };
      const checkCurrency = () => { 
        Object.entries(this.countryCurrency).forEach(item => {
          for (let [key, value] of Object.entries(item[1])) {
            if (key == "name") {
              if (value !== null) {
                // console.log(value);
                this.resultCurrency.push(value);
              }

            }
          }
        })
      }
      checkCurrency(); 
      this.countryLang = { ...this.languages };
      Object.entries(this.countryLang).forEach(lang => {
        for (let [key, value] of Object.entries(lang[1])) {
          if (key == "name") {
            this.resultLang.push(value);
          }
        }
      })

      //bordering countries
      if (this.borders.length <= 0) {
        console.log("no surrounding countries");
        return;
      } else {

      }
      
      this.borders.forEach(border => {
        const apiEndpoint = `https://restcountries.eu/rest/v2/alpha/${border}`;

        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {
            this.borderingCountries.push({name:data.name,flag:data.flag});
          }).catch(error => console.log(error))

        //----------------------------------------
      })
    });


  }

  //country button functionality
  changeCountry(event): any {
    this.count++;
    console.log(event);
    const targetBtn = event.trim();
    console.log(targetBtn);


    const fetchCountry = () => {
      const apiEndpoint = `https://restcountries.eu/rest/v2/name/${targetBtn}`;
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          let currentData = { ...data };
          this.currencies = [];
          console.log(currentData[0].name);
          console.log(currentData[0].flag);

          this.name = currentData[0].name;
          this.population = currentData[0].population;
          this.capital = currentData[0].capital;
          this.flag = currentData[0].flag;
          this.region = currentData[0].region;
          this.subregion = currentData[0].subregion;
          this.tld = currentData[0].topLevelDomain;

          this.countryCurrency = currentData[0].currencies;
          console.log(this.countryCurrency);
          const checkCurrency = () => { //edit in motion this is duplicate code
            this.resultCurrency = [];
            Object.entries(this.countryCurrency).forEach(item => {
              for (let [key, value] of Object.entries(item[1])) {
                if (key == "name") {
                  if (value !== null) {
                    // console.log(value);
                    this.resultCurrency.push(value);
                  }

                }
              }
            })
          }
          checkCurrency();


          this.countryLang = currentData[0].languages;
          //another duplicate code that needs to be taken care of
          const changeLangs = () => {
            this.resultLang = [];
            Object.entries(this.countryLang).forEach(lang => {
              for (let [key, value] of Object.entries(lang[1])) {
                if (key == "name") {
                  // console.log(value);
                  this.resultLang.push(value);
                }
              }
            })
          }
          changeLangs();

          this.alpha3Code = currentData[0].alpha3Code;
          this.nativeName = currentData[0].nativeName;
          const borderCheck = () => {
            console.log("entered intoborder check");
            this.borderingCountries = [];
              this.borders.forEach(border => {
                const apiEndpoint = `https://restcountries.eu/rest/v2/alpha/${border}`;
                fetch(apiEndpoint)
                  .then(response => response.json())
                  .then(data => {
                    this.borderingCountries.push({name:data.name,flag:data.flag});
                  }).catch(error => console.log(error))
              })
          }
          borderCheck();
          
          // ###################################### //
        }).catch(error => console.log(error))
    }

    fetchCountry();



  }

  //End of country btn logic


}
