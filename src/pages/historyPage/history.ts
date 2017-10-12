import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {StorageService} from "../../service/StorageService";
import {Picture} from "../../model/Picture";
import {FormPage} from "../formPage/formPage";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {

  pictures: Picture[];
  names: string[];

  constructor(public navCtrl: NavController, public storageService: StorageService) {

      this.storageService.getPictureData().then((data) => {
        this.pictures = data;
      });
  }

  delete() {
    this.storageService.deletePictures();
    this.storageService.getPictureData().then((data) => {
      this.pictures = data;
    });
  }

  inspect(picture: Picture){
    this.navCtrl.push(FormPage, {data: picture});
  }
}
