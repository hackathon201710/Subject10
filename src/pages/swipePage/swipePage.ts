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
  profileInformation: any[];
  currentinformation: any;

   //[{"gender":"female","name":{"title":"ms","first":"scarlett","last":"bradley"},"location":{"street":"9981 boghall road","city":"ratoath","state":"cavan","postcode":11268},"email":"scarlett.bradley@example.com","login":{"username":"goldenpeacock277","password":"passpass","salt":"UUNSX7Uo","md5":"b275f9ae9140a42e3de800916bcefc91","sha1":"227f1f89c0ffd46464be9a7669a0083a7dcdbb4a","sha256":"50b4ba317a33b4c3c4e5fe9287e454a66d0a6e0880da5ea4fc47518208cba91d"},"dob":"1968-09-01 04:41:42","registered":"2007-01-25 07:06:51","phone":"071-299-4616","cell":"081-578-2624","id":{"name":"PPS","value":"8170144T"},"picture":{"large":"https://randomuser.me/api/portraits/women/47.jpg","medium":"https://randomuser.me/api/portraits/med/women/47.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/47.jpg"},"nat":"IE"}]


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

    console.log("this is the list of cards", this.cards)
    console.log("This is the displaying profile", this.profile)
    console.log("This is a list of contacts: ", this.listOfContacts);

  }

  goToHistory(){
    this.navCtrl.push(HistoryPage)
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [{data: this.pictureService.getPictureData()[0].data, name: this.pictureService.getPictureData()[0].name}];
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
  } else {
    this.navCtrl.push(FormPage, {cnt: this.cnt});
    this.recentCard = 'You disliked: ' + removedCard.email;
    this.cnt++;
  }

  console.log("CardArrayLegth", this.cards.length)

  if(this.cards.length == 0){
    this.addNewCards();
    this.cnt = 0;
  }

}

// Add new cards to our array
addNewCards() {
  this.cards.push(this.listOfContacts[5])
  this.cards.push(this.listOfContacts[4])
  this.cards.push(this.listOfContacts[3])
  this.cards.push(this.listOfContacts[2])
  this.cards.push(this.listOfContacts[1])
  this.cards.push(this.listOfContacts[0])

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
