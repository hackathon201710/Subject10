import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PictureService} from "../../service/PictureService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: string;

  constructor(public navCtrl: NavController, public pictureService: PictureService) {
    this.data = this.pictureService.getPictures()[0];
    console.log(this.data);
  }

}
