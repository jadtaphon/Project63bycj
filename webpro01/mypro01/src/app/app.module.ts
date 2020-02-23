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
import { InfonameComponent } from './infoname/infoname.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';
//import { QrCodeAllModule } from 'ngx-qrcode-all';

import { CountdownModule } from 'ngx-countdown';
import { StudentFilterPipe } from './info/student-filter.pipe';

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
    InfonameComponent,
    StudentFilterPipe,
   
  ],
  imports: [
    NgxQRCodeModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CountdownModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
