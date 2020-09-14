import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // constructor(
  //   private router: Router
  // ) { }

  // searchProduct(value: string) {
  //   console.log('searchProduct.value :>> ', value);
  //   this.router.navigateByUrl(`/search/${value}`);
  // }
}
