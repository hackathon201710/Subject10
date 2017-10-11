import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {

  knownPictures: any;

  constructor(public navCtrl: NavController) {



  }

}
