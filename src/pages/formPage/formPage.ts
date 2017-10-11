import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { PictureService} from '../../service/PictureService';
import {HistoryPage} from "../historyPage/history";

@Component({
  selector: 'page-form',
  templateUrl: 'formPage.html'
})
export class FormPage {

    myPictures: string;
    cnt: number;

  constructor(public navCtrl: NavController,  public pictureService: PictureService, public navParams: NavParams) {
    this.cnt = this.navParams.get('cnt');
    this.myPictures = pictureService.getPictures()[this.cnt];
  }

  done() {
    this.navCtrl.push(HistoryPage);
  }


}
