import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-team';
  url: any;
  show : any;

  constructor(private route: ActivatedRoute) {
  

  }
  ngOnInit(){
    this.url = location.pathname.split("/")[1];
    if (this.url!='student') {
      this.show = false;
    }else{
      this.show = true;
    }
  }
}
