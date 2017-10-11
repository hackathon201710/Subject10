import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {PictureService} from "../../service/PictureService";
import {FormPage} from "../formPage/formPage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  data: string;
  cnt: number = 0;

  constructor(public navCtrl: NavController, public pictureService: PictureService) {
    this.data = this.pictureService.getPictures()[this.cnt];
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(this.slides.getActiveIndex() === currentIndex + 1){
    }
  }

  swipeRight(){
    this.navCtrl.push(FormPage, {cnt: this.cnt});
    console.log("home" + this.cnt)
  }

  newPicture(){
    this.cnt++;
    this.data = this.pictureService.getPictures()[this.cnt];
  }

}
