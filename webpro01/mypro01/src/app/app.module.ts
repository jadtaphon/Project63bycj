import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopbarComponent } from './topbar/topbar.component';
import { CardComponent } from './card/card.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { QrCodeAllModule } from 'ngx-qrcode-all';
import { QRCodeModule } from 'angular2-qrcode';
import { CountdownModule } from 'ngx-countdown';

import { CardFilterPipe } from "./card/card-filter.pipe";
import { EditFilterPipe } from "./edit/edit-filter.pipe";
import { StudentFilterPipe } from "./info/student-filter.pipe";

import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { EditComponent } from './edit/edit.component';
import { FromstusentComponent } from './fromstusent/fromstusent.component';
import { InfoComponent } from './info/info.component';
import { InfonameComponent } from './infoname/infoname.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    CardComponent,
    UploadfileComponent,
    EditComponent,
    FromstusentComponent,
    InfoComponent,
    InfonameComponent,
    QrcodeComponent,
    CardFilterPipe,
    EditFilterPipe,
    StudentFilterPipe,
  ],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    QRCodeModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
