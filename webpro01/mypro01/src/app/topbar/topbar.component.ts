import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
//import { Subscription } from 'rxjs';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  //subscription: Subscription;
 nameT:any;
  constructor(private router: Router) { }

  ngOnInit() {
    
    if (localStorage.getItem('name')!=null) {
      this.nameT=localStorage.getItem('name')
    }
  }
  // homeage(){
  //   this.router.navigate(['']);
  //   this.subscription.unsubscribe();
  // }
  page1(){
    this.router.navigate(['form'])
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
