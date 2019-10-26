import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  pageqr(){
    
    this.router.navigate(['qrcode'])
  }
  pageup(){
    this.router.navigate(['update'])
  }
  pageinfo(){
    this.router.navigate(['info'])
  }

}
