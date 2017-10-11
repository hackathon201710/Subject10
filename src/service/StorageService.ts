import {Injectable} from "@angular/core";
import {Picture} from "../model/Picture";
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {
  }

  getPictureData(): Promise<Picture[]> {
    return new Promise((resolve, reject) => {
      this.storage.get("pictures").then((val) => {
        if (val) {
          resolve(val);
        } else {
          resolve([]);
        }
      });
    });
  }

  savePictureData(picture: Picture): Promise<Picture[]> {
    return new Promise((resolve, reject) => {
      if (!picture || !picture.name) {
        reject();
      }
      this.getPictureData().then((data: Picture[]) => {
        let saved = false;
        if (!data) {
          data = [];
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === picture.name) {
            data[i] = picture;
            saved = true;
          }
        }
        if (!saved) {
          data.push(picture);
        }
        this.storage.set("pictures", data);
        resolve(data);
      });
    });
  }

  deletePictures() {
    this.storage.set("pictures", []);
  }
}
