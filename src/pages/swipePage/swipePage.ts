import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PictureService } from "../../service/PictureService";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {FormPage} from "../formPage/formPage";



import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import {HistoryPage} from "../historyPage/history";



@Component({
  selector: 'swipePage-home',
  templateUrl: 'swipePage.html'
})
export class SwipePage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;


  cnt: number = 0;
  currentIndex: number = 0;
  listOfContacts: any[];
  profile: string;
  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  isDone: boolean;

  constructor(public navCtrl: NavController, public pictureService: PictureService) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };

    this.listOfContacts = this.pictureService.getPictureData();
    this.cards = new Array<any>();
    this.isDone = false;
  }

  goToHistory(){
    this.navCtrl.push(HistoryPage);
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.addNewCards();
  }

// Called whenever we drag an element
onItemMove(element, x, y, r) {
  var color = '';
  var abs = Math.abs(x);
  let min = Math.trunc(Math.min(16*16 - abs, 16*16));
  let hexCode = this.decimalToHex(min, 2);

  if (x < 0) {
    color = '#FF' + hexCode + hexCode;
  } else {
    color = '#' + hexCode + 'FF' + hexCode;
  }

  element.style.background = color;
  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
}

// Connected through HTML
voteUp(like: boolean) {
  let removedCard = this.cards.pop();
  if (like) {
    this.recentCard = 'You liked: ' + removedCard.email;
    this.cnt++;
    console.log(removedCard)
    this.isDone = false;

  } else {
    this.navCtrl.push(FormPage, {cnt: this.cnt});
    this.recentCard = 'You disliked: ' + removedCard.email;
    this.cnt++;
    this.isDone = false;

  }

  if (this.cards.length == 0){
    this.isDone = true;
  }

  console.log("CardArrayLegth", this.cards.length)

}

// Add new cards to our array
addNewCards() {
  this.cards.push(this.listOfContacts[5]);
  this.cards.push(this.listOfContacts[4]);
  this.cards.push(this.listOfContacts[3]);
  this.cards.push(this.listOfContacts[2]);
  this.cards.push(this.listOfContacts[1]);
  this.cards.push(this.listOfContacts[0]);
}

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
}

}
