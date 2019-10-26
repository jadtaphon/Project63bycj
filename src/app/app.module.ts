import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardhomeComponent } from './cardhome/cardhome.component';
import { TopbarComponent } from './topbar/topbar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { FormfileComponent } from './formfile/formfile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { FormupComponent } from './formup/formup.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    CardhomeComponent,
    TopbarComponent,
    CardComponent,
    FormfileComponent,
    QrcodeComponent,
    FormupComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
