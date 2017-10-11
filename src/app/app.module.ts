import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormPage} from '../pages/formPage/formPage';
import {PictureService} from "../service/PictureService";
import {PictureCard} from "../components/picture.card.component";
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { SwipePage } from '../pages/swipePage/swipePage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PictureCard,
    FormPage,
    SwipePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SwingModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
    PictureCard,
    SwipePage,
  ],
  providers: [
    PictureService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
