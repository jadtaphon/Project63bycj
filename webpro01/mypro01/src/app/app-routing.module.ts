import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './info/info.component';
import { FromstusentComponent } from './fromstusent/fromstusent.component';
import { InfonameComponent } from './infoname/infoname.component';


const routes: Routes = [
  { path: '', component: CardComponent },
  { path: 'uplode', component: UploadfileComponent },
  { path: 'qrcode/:id', component: QrcodeComponent },
  { path: 'update/:id', component: EditComponent },
  { path: 'info/:id', component: InfoComponent },
  { path: 'student/:id', component: FromstusentComponent },
  { path: 'infoname/:id', component: InfonameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
