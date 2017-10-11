import {Injectable} from "@angular/core";
import {Picture} from "../model/Picture";

@Injectable()
export class StorageService {

  savePictureData(picture: Picture) {
    if (!picture) {
      return;
    }
  }
}
