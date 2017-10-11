import {Component, Input} from "@angular/core";

@Component({
  selector: "picture-card",
  templateUrl: 'picture.card.html'
})
export class PictureCard {

  @Input() data: string;
}
