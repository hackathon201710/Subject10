import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {PictureService} from "../../service/PictureService";
import {FormPage} from "../formPage/formPage";
import {HistoryPage} from "../historyPage/history";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  data: string;
  cnt: number = 0;
  currentIndex: number = 0;

  constructor(public navCtrl: NavController, public pictureService: PictureService) {
    this.data = this.pictureService.getPictures()[this.cnt];
  }

  slideChanged() {
    if(this.slides.getPreviousIndex() < this.slides.getActiveIndex()){
      this.swipeLeft();
    }else{
      this.swipeRight();
    }
  }

  goToHistory(){
    this.navCtrl.push(HistoryPage)
  }

  swipeRight(){
    this.navCtrl.push(FormPage, {cnt: this.cnt});
  }

  swipeLeft(){
    this.cnt++;
    this.newPicture()
  }

  newPicture(){
    this.data = this.pictureService.getPictures()[this.cnt];
  }

}
