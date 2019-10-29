import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  homeage(){
    this.router.navigate([''])
  }
  page1(){
    this.router.navigate(['form'])
  }
}
