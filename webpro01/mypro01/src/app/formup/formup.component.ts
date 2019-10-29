import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-formup',
  templateUrl: './formup.component.html',
  styleUrls: ['./formup.component.scss']
})
export class FormupComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate([''])
  }

}
