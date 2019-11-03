import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardhomeComponent } from './cardhome/cardhome.component';
import { FormfileComponent } from './formfile/formfile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { FormupComponent } from './formup/formup.component';
import { InfoComponent } from './info/info.component';
import { FromstusentComponent } from "./fromstusent/fromstusent.component";


const routes: Routes = [
  { path: '', component: CardhomeComponent },
  { path: 'form', component: FormfileComponent },
  { path: 'qrcode', component: QrcodeComponent },
  { path: 'update', component: FormupComponent },
  { path: 'info', component: InfoComponent },
  { path: 'student', component: FromstusentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
