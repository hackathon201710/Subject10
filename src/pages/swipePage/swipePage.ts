import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PictureService } from "../../service/PictureService";
import { Http } from '@angular/http';
import 'rxjs/Rx';


import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';



@Component({
  selector: 'swipePage-home',
  templateUrl: 'swipePage.html'
})
export class SwipePage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  data: string;
  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  profileInformation: any[];
  currentinformation: any;

   //[{"gender":"female","name":{"title":"ms","first":"scarlett","last":"bradley"},"location":{"street":"9981 boghall road","city":"ratoath","state":"cavan","postcode":11268},"email":"scarlett.bradley@example.com","login":{"username":"goldenpeacock277","password":"passpass","salt":"UUNSX7Uo","md5":"b275f9ae9140a42e3de800916bcefc91","sha1":"227f1f89c0ffd46464be9a7669a0083a7dcdbb4a","sha256":"50b4ba317a33b4c3c4e5fe9287e454a66d0a6e0880da5ea4fc47518208cba91d"},"dob":"1968-09-01 04:41:42","registered":"2007-01-25 07:06:51","phone":"071-299-4616","cell":"081-578-2624","id":{"name":"PPS","value":"8170144T"},"picture":{"large":"https://randomuser.me/api/portraits/women/47.jpg","medium":"https://randomuser.me/api/portraits/med/women/47.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/47.jpg"},"nat":"IE"}]


  constructor(private http: Http, public pictureService: PictureService) {
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

    this.profileInformation = [
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "Loki",
        "last": ""
      },
      "location": {
        "street": "Valhalla",
        "city": "Stockholm",
        "state": "Södermanland",
        "postcode": "16865"
      },
      "email": "loki@totalyfake.com",
      "login": {
        "username":"goldenpeacock277",
        "password":"passpass",
        "salt":"UUNSX7Uo",
        "md5":"b275f9ae9140a42e3de800916bcefc91",
        "sha1":"227f1f89c0ffd46464be9a7669a0083a7dcdbb4a",
        "sha256":"50b4ba317a33b4c3c4e5fe9287e454a66d0a6e0880da5ea4fc47518208cba91d"},
        "dob":"1968-09-01 04:41:42",
        "registered":"2007-01-25 07:06:51",
        "phone":"071-299-4616",
        "cell":"081-578-2624",
        "id":{
          "name":"PPS",
          "value":"8170144T"
        },
        "nat":"IE"
    }
    ]
    this.data = this.pictureService.getPictures()[0];
  }
  
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    
    this.cards = [{email: ''}];
    this.addNewCards(1);
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
  this.addNewCards(1);
  if (like) {
    this.recentCard = 'You liked: ' + removedCard.email;
  } else {
    this.recentCard = 'You disliked: ' + removedCard.email;
  }
}
 
// Add new cards to our array
addNewCards(count: number) {
  /*this.http.get('https://randomuser.me/api/?results=' + count)
  .map(data => data.json().results)
  .subscribe(result => {

   // console.log("result: " + JSON.stringify(result))
    for (let val of result) {
    //  console.log("val: " + JSON.stringify(val))
      this.cards.push(val);
    }
  })*/

  this.cards.push(this.profileInformation)
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
