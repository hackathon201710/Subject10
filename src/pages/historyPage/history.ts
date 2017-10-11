import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {StorageService} from "../../service/StorageService";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {

  knownPictures: any;

  constructor(public navCtrl: NavController, public storageService: StorageService) {

      this.storageService.getPictureData().then((data) => {
        this.knownPictures = data;
        console.log(this.knownPictures.length);
      });



  }

}
