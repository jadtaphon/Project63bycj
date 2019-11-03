import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardhomeComponent } from './cardhome/cardhome.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { TopbarComponent } from './topbar/topbar.component';
import { CardComponent } from './card/card.component';
import { FormfileComponent } from './formfile/formfile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { FormupComponent } from './formup/formup.component';
import { InfoComponent } from './info/info.component';
import { FromstusentComponent } from './fromstusent/fromstusent.component';

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
    FromstusentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
