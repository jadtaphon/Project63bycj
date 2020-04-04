import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router'
import { MenuService } from "../services/menu.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  nameT: any;
  url: any;
  menuList: any;
  show: any = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private menuService: MenuService
  ) { 
    this.url = location.pathname.split("/")[1];
    console.log(this.url);
    if (this.url=="student") {
      this.show = true;
      console.log(this.show);
      
      console.log('g-hk');
      
    }
  }

  ngOnInit() {
    
    
    if (this.url != '') {
      this.menuList = this.menuService.getMenuList();
      console.log(this.menuList);
    }



    if (localStorage.getItem('name') != null) {
      this.nameT = localStorage.getItem('name')
    }

  }

}
