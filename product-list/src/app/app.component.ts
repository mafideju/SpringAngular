import { Component } from '@angular/core';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Brazil',
    flag: 'a/a2/Flag_of_Brazil_%283-2%29.svg',
    area: 8511964,
    population: 210610298
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287000,
    population: 1353984954
  },
  {
    name: 'Argentina',
    flag: '3/35/Flag_of_Argentina_%283-2%29.svg',
    area: 2780456,
    population: 44498763
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spring boot approach';
  countries = COUNTRIES;
}
