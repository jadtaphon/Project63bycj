import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardhome',
  templateUrl: './cardhome.component.html',
  styleUrls: ['./cardhome.component.scss']
})
export class CardhomeComponent implements OnInit {
  namet: any;
  show: any = false;
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('name') != null) {
      this.namet= localStorage.getItem('name');
      this.show = true;
    }
  }
  nameT(names: any) {
    this.namet = names;
    localStorage.setItem('name', names)
    location.reload();
    this.show = true;
  }

}
