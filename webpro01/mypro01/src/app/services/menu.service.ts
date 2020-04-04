import { Injectable } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';

@Injectable({
  providedIn: 'root'
})


export class MenuService {
  menuLists: MenuItem[];

  constructor() { }

  getMenuList() {
    return this.menuLists;
  }
  serMenuItem(url1, name1, url2, name2, url3, name3) {
    this.menuLists = [
      {
        group: { code: url1, name: name1 }
      },
      {
        group: { code: url2, name: name2 }
      },
      {
        group: { code: url3, name: name3 }
      }
    ];
    console.log(this.menuLists);

  }
}
export interface MenuItem {
  group: Menu;
}
export interface Menu {
  code: string;
  name: string;
}
