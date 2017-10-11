import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { PictureService} from '../../service/PictureService';
import {HistoryPage} from "../historyPage/history";
import {StorageService} from "../../service/StorageService";
import {Picture} from "../../model/Picture";

@Component({
  selector: 'page-form',
  templateUrl: 'formPage.html'
})
export class FormPage {

    name: any = "";
    comment: any = "";
    data: any = "";
    cnt: number;
    picture: Picture;

  constructor(public navCtrl: NavController,  public pictureService: PictureService, public navParams: NavParams, public storageService: StorageService) {
    this.cnt = this.navParams.get('cnt');
    this.picture = new Picture;
    this.data = pictureService.getPictures()[this.cnt];
  }

  done() {
    this.picture.data = this.data;
    this.picture.name = this.name;
    this.picture.comment = this.comment;
    console.log("NAME: " + this.picture.name);
    console.log("COMMENT : " + this.picture.comment);
    this.storageService.savePictureData(this.picture);
    this.navCtrl.push(HistoryPage);
  }


}
