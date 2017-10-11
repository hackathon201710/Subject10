import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PictureService} from '../../service/PictureService';

@Component({
  selector: 'page-form',
  templateUrl: 'formPage.html'
})
export class FormPage {

    myPictures: string

  constructor(public navCtrl: NavController,  public pictureService: PictureService) {
    this.myPictures = pictureService.getPictures()[0];

    
  }


}
