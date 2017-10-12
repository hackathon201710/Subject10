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

    comment: any = "";
    data: any = "";
    cnt: number;
    isDisabled: boolean = false;

  constructor(public navCtrl: NavController,  public pictureService: PictureService, public navParams: NavParams, public storageService: StorageService) {
    this.cnt = this.navParams.get('cnt');
    if(this.cnt === undefined){
      this.data = this.navParams.get('data');
      this.comment = this.data.comment;
      this.isDisabled = true;
      console.log(this.data);
    }else {
      this.isDisabled = false;
      this.data = pictureService.getPictureData()[this.cnt];
    }

  }

  done() {
    this.data.comment = this.comment;
    this.storageService.savePictureData(this.data).then(() => {
      this.navCtrl.pop();
    });
  }


}
