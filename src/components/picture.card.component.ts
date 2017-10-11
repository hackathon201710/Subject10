
import {Component, Input} from "@angular/core";

let template  = `
  <ion-card>
    <img src="{{data}}">
  </ion-card>
`;

@Component({
  selector: "picture-card",
  template: template
})
export class PictureCard {

  @Input() data: string;
}
