import {Component} from '@angular/core';
import {Adress} from "./ts/Adress";
import {Router} from "@angular/router";

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {

  }

  onList_RequestEdit(adress: Adress) {
    //console.log("onList_RequestEdit");
    //this.router.navigate(['/edit']);
  }
}
