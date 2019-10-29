import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import QRCode from 'qrcode'

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
    let opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
            quality: 0.3
        }
      }
QRCode.toDataURL('text', opts, function (err, url) {
  if (err) throw err
  var img = document.getElementById('image');
  img.setAttribute('src',url);
  console.log(img);
  
})
// const generateQR = async text => {
//           try {
//             console.log(await QRCode.toDataURL(text))
//           } catch (err) {
//             console.error(err)
//           }
//           }
  
  }
  qrcode(){
    this.router.navigate(['info'])
  }

}
